import { LitElement, html } from '../../assets/@polymer/lit-element/lit-element.js'
import '../../assets/ace-builds/src-noconflict/ace.js'
import '../../assets/ace-builds/src-noconflict/ext-language_tools.js';
import '../../assets/ace-builds/src-noconflict/snippets/snippets.js';

import '../../debug.js'
import dedent from '../../assets/dedent.js'

const log = debug('component:ace-editor')

class AceEditor extends LitElement {
  
  static get properties() {
    
    // AceEditor properties from editor.$options
    return {
      alt: Boolean,
      indent: Boolean,
      baseurl: String,
      theme: String,
      value: String,
      mode: String,
      readonly: Boolean,
      softtabs: Boolean,
      wrap: Boolean,
      fontSize: Number,
      tabSize: Number,
      snippets: String,
      autocomplete: Object,
      minLines: Number,
      maxLines: Number,
      enableBasicAutocompletion: Boolean,
      enableLiveAutocompletion: Boolean,
      enableSnippets: Boolean,
      initialFocus: Boolean,
      placeholder: String,
    }
  }
  
  constructor() {
    super();
    this.alt = false;
    this.indent = false;
    this.theme = 'github';
    this.mode = 'text';
    this.value = '';
    this.readonly = false;
    this.softtabs = true;
    this.wrap = false;
    this.fontSize = 14;
    this.tabSize = 4;
    // this.snippets = '';
    // this.autocomplete = {};
    // this.minLines = 15;
    // this.maxLines = 30;
    this.enableBasicAutocompletion = true;
    this.enableLiveAutocompletion = false;
    this.enableSnippets = false;
    this.initialFocus = false;
    this.placeholder = '';
    this.baseurl = '../../assets/ace-builds/src-noconflict';
    
  }

  _shouldRender(props, changedProps, prevProps) {
    log('_shouldRender', { props, changedProps, prevProps })
    return true;
  }
  
  _firstRendered() {
    log('_firstRendered')
    
    // In non-minified mode, imports are parallelized, and sometimes `ext-language_tools.js` and`snippets.js` arrive before `ace.js` is ready. I am adding some tests here with dynamic imports to fix that
    // !ace && await import(`${this.baseurl}/ace.js`)
    // !ace.require("ace/ext/language_tools") && await import(`${this.baseurl}/ext-language_tools.js`)
    
    this.prepare(ace.edit(this._root.getElementById('editor')));
  }
  
  prepare(editor) {
    
    let {
      alt,
      baseurl,
      initialFocus,
      enableSnippets,
      enableBasicAutocompletion,
      enableLiveAutocompletion,
      autocomplete,
      minLines,
      maxLines,
      theme,
      placeholder,
    } = this;
    
    this.editor = editor;
    
    editor.focus = () => {
      log('editorFocus', { editor })
      setTimeout(() => !editor.isFocused() && editor.textInput.focus())
      editor.textInput.$focusScroll = "browser"
      editor.textInput.focus();
    };

    this.dispatchEvent(new CustomEvent('ready', { detail: { editor }}));
    
    log('initializeEditor', { baseurl })

    this.injectStyle('#ace_editor\\.css');

    ['base', 'mode', 'theme', 'worker']
      .map(name => ace.config.set(`${name}Path`, baseurl))

    this.themeChanged();

    editor.setOptions({
      enableSnippets,
      enableBasicAutocompletion,
      enableLiveAutocompletion,
      minLines,
      maxLines,
      
      // lineNumbers: true,
      // viewportMargin: Infinity,
      firstLineNumber: 0,
      // fixedGutter: false,
      // selectionStyle: "line",
    })
    
    editor.on('change', this.change.bind(this))
    editor.on('input', () => this.input(editor, placeholder));
    setTimeout(() => this.input(editor, placeholder), 100);
    
    initialFocus && editor.focus()

    editor.$blockScrolling = Infinity;

    editor.setTheme(`ace/theme/${theme}`);

    // Forcing a xyzChanged() call, because the initial one din't do anything as editor wasn't created yet
    this.readonlyChanged();
    this.wrapChanged();
    this.tabSizeChanged();
    this.modeChanged();
    this.softtabsChanged();
    this.fontSizeChanged();
    
    // snippets
    enableSnippets && ace.require('ace/snippets').snippetManager.register(snippets, 'javascript');
    
    // autocomplete
    ace.require('ace/ext/language_tools').addCompleter({
      getCompletions: (editor, session, pos, prefix, callback) =>
        callback(null, (prefix.length === 0) ? [] : (autocomplete || [])),
    });
    
    alt && this.swapAlt(alt)

    log('value after initializing', editor.getSession().getValue());
  }
  
  swapAlt() {
    // Tell ace that the alt key is held down for mousedown events
    // This makes it so blockselection is always on
    // It also allows block selection on chromebooks
    this.editor._eventRegistry.mousedown[1] = (func => e => func({
      ...e, ...e.__proto__,
      getButton: () => e.getButton(),
      domEvent: { ...e.domEvent,
        altKey: !e.domEvent.altKey,
        shiftKey: e.domEvent.shiftKey,
        ctrlKey: e.domEvent.ctrlKey,
      },
    }))(this.editor._eventRegistry.mousedown[1])
  }

  _render({ value, indent }) {

    return html`
      <style>
        :host {
          display: block;
        }
    
        #editor {
          border: 1px solid #e3e3e3;
          border-radius: 4px;
          @apply --ace-editor;
          height: 100%;
          width: 100%;
        }
      </style>
      <div id="editor">${value ? value : indent ? this.textContent : dedent(this.textContent)}</div>
    `;
  }
  
  addCommands(commands, editor) {
    commands.map(({ name, ...command }) => {
      this.editor.commands.addCommand({
        ...(this.editor.commands.commands[name] || { name }),
        ...command,
      })
    })
  }
  
  /**
   * Injects a style element into ace-widget's shadow root
   * @param {CSSSelector} selector for an element in the same shadow tree or document as `ace-widget`
   */
  injectStyle(selector){
    log('injectStyle', selector)
    const lightStyle = this.getRootNode().querySelector(selector) || document.querySelector(selector);
    this.shadowRoot.appendChild(lightStyle.cloneNode(true));
  }
  
  change(event, editor) {
    let { editorValue, _value } = this;
    log('editorChangeAction', { editorValue, _value })
    return this.dispatchEvent(new CustomEvent('editor-content', {
      detail: {
        value: editorValue,
        oldValue: _value,
      }
    }));
  }

  get editorValue() {
    let { editor } = this;
    log('get editorValue', { editor })
    return editor.getValue()
  }

  set editorValue(value) {
    let { editor, _value } = this;
    log('set editorValue', { editor, _value, value })
    if (value) {
      _value = value;
      editor.setValue(value);
    }
  }
  
  valueChanged() {
    let { editor, editorValue, value } = this;
    log('valueChanged', { editor, editorValue, value })
    if (editor && editorValue != value) {
      editorValue = value;
      editor.clearSelection();
      editor.resize();
    }
  }
  
  readonlyChanged() {
    let { editor, readonly } = this;
    log('readonlyChanged', { editor, readonly })
    editor.setReadOnly(readonly);
    editor.setHighlightActiveLine(!readonly);
    editor.setHighlightGutterLine(!readonly);
    editor.renderer.$cursorLayer.element.style.opacity = readonly ? 0 : 1;
  }

  wrapChanged() {
    let { editor, wrap } = this;
    log('wrapChanged', { editor, wrap })
    editor.getSession().setUseWrapMode(wrap)
  }
  
  tabSizeChanged() {
    let { editor, tabSize } = this;
    log('tabSizeChanged', { editor, tabSize })
    tabSize && editor.getSession().setTabSize(tabSize)
  }
  
  fontSizeChanged() {
    let { editor, fontSize } = this;
    log('fontSizeChanged', { editor, fontSize })
    this._root.getElementById('editor').style.fontSize = `${fontSize}px`
  }
  
  modeChanged() {
    let { editor, mode } = this;
    log('modeChanged', { editor, mode })
    editor.getSession().setMode(mode)
  }
  
  softtabsChanged() {
    let { editor, softtabs } = this;
    log('softtabsChanged', { editor, softtabs })
    editor.getSession().setUseSoftTabs(softtabs)
  }
  
  themeChanged() {
    let { editor, theme } = this;
    log('themeChanged', { editor, theme })
    editor.setTheme(theme)
  }

  focus() {
    let { editor } = this;
    log('focus', { editor })
    editor.focus()
  }

  input(editor, placeholder) {
    log('input', { editor, placeholder })
    let shouldShow = !editor.getSession().getValue().length;
    let node = editor.renderer.emptyMessageNode;
    log('input', { shouldShow, node });
    if (!shouldShow && node) {
        editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
        editor.renderer.emptyMessageNode = null;
    } else if (shouldShow && !node) {
        log('input - shouldShow && !node');
        node = editor.renderer.emptyMessageNode = document.createElement('div');
        node.textContent = placeholder;
        node.className = 'ace_comment';
        node.style.padding = '0 9px';
        node.style.zIndex = '1';
        node.style.position = 'absolute';
        node.style.color = '#aaa';
        log('input - node', node);
        editor.renderer.scroller.appendChild(node);
    }
  }
  
}

customElements.define('ace-editor', AceEditor);