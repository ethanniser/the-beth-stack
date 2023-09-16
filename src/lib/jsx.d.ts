// This file is a result from many sources, including: RFCs, typescript dom lib, w3schools, and others.
// Possibly there are many tags/attributes missing, but it is a good start.
// Missing something? Please submit a issue report or a PR:
// https://github.com/kitajs/html

declare namespace JSX {
  type Element = Promise<string>;

  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
  type CSSProperties = import("csstype").Properties<string | number | boolean>;

  interface HtmlTag extends ElementChildrenAttribute, IntrinsicAttributes {
    accesskey?: undefined | string;
    class?: undefined | string;
    contenteditable?: undefined | string;
    dir?: undefined | string;
    hidden?: undefined | string | boolean;
    id?: undefined | string;
    role?: undefined | string;
    lang?: undefined | string;
    draggable?: undefined | string | boolean;
    spellcheck?: undefined | string | boolean;
    tabindex?: undefined | number | string;
    title?: undefined | string;
    translate?: undefined | string | boolean;

    /**
     * A css style attribute which also supports a `csstype` object.
     */
    style?: undefined | string | CSSProperties;

    /**
     * Tells if any inner html should be escaped.
     *
     * **Warning: This also escapes inner jsx tags. You should only use this in the inner tag.**
     *
     * @example
     * ```tsx
     * <div>{'<script />'}</div>
     * '<div><script /></div>'
     *
     * <div safe>{'<script />'}</div>
     * '<div>&lt;script /&gt;</div>'
     *
     * <div><div>{'<script />'}</div></div>
     * '<div><div><script /></div></div>'
     *
     * // Escapes even inner jsx tags
     * <div safe><div>{'<script />'}</div></div>
     * '<div>&lt;div&gt;&lt;script /&gt;&lt;/div&gt;</div>'
     * ```
     *
     * @default false
     *
     * @see https://github.com/kitajs/html#sanitization
     */
    safe?: undefined | boolean;

    /**
     * Included here to work as a react drop-in replacement
     *
     * @deprecated please use `class`.
     */
    className?: undefined | string;
  }

  interface HtmlAnchorTag extends HtmlTag {
    href?: undefined | string;
    hreflang?: undefined | string;
    target?: undefined | string;
    download?: undefined | string;
    referrerpolicy?: undefined | string;
    ping?: undefined | string;
    rel?: undefined | string;
    media?: undefined | string;
    type?: undefined | string;
  }

  interface HtmlAreaTag extends HtmlTag {
    alt?: undefined | string;
    coords?: undefined | string;
    shape?: undefined | string;
    href?: undefined | string;
    target?: undefined | string;
    ping?: undefined | string;
    rel?: undefined | string;
    media?: undefined | string;
    hreflang?: undefined | string;
    type?: undefined | string;
  }

  interface HtmlAudioTag extends HtmlTag {
    src?: undefined | string;
    autobuffer?: undefined | string;
    autoplay?: undefined | string | boolean;
    preload?: undefined | string;
    muted?: undefined | string | boolean;
    loop?: undefined | string | boolean;
    controls?: undefined | string;
  }

  interface BaseTag extends HtmlTag {
    href?: undefined | string;
    target?: undefined | string;
  }

  interface HtmlQuoteTag extends HtmlTag {
    cite?: undefined | string;
  }

  interface HtmlBodyTag extends HtmlTag {}

  interface HtmlButtonTag extends HtmlTag {
    action?: undefined | string;
    autofocus?: undefined | string;
    disabled?: undefined | boolean;
    enctype?: undefined | string;
    form?: undefined | string;
    method?: undefined | string;
    name?: undefined | string;
    novalidate?: undefined | string | boolean;
    target?: undefined | string;
    type?: undefined | string;
    value?: undefined | string;
  }

  interface HtmlDataListTag extends HtmlTag {}

  interface HtmlCanvasTag extends HtmlTag {
    width?: undefined | string;
    height?: undefined | string;
  }

  interface HtmlTableColTag extends HtmlTag {
    span?: undefined | string;
  }

  interface HtmlTableSectionTag extends HtmlTag {}

  interface HtmlTableRowTag extends HtmlTag {}

  interface DataTag extends HtmlTag {
    value?: undefined | string;
  }

  interface HtmlEmbedTag extends HtmlTag, Record<string, any> {
    src?: undefined | string;
    type?: undefined | string;
    width?: undefined | string;
    height?: undefined | string;
  }

  interface HtmlFieldSetTag extends HtmlTag {
    disabled?: undefined | boolean;
    form?: undefined | string;
    name?: undefined | string;
  }

  interface HtmlFormTag extends HtmlTag {
    ["accept-charset"]?: undefined | string;
    action?: undefined | string;
    autocomplete?: undefined | string;
    enctype?: undefined | string;
    method?: undefined | string;
    name?: undefined | string;
    novalidate?: undefined | string | boolean;
    target?: undefined | string;
  }

  interface HtmlHtmlTag extends HtmlTag {
    manifest?: undefined | string;
  }

  interface HtmlIFrameTag extends HtmlTag {
    src?: undefined | string;
    srcdoc?: undefined | string;
    name?: undefined | string;
    sandbox?: undefined | string;
    seamless?: undefined | string;
    width?: undefined | string;
    height?: undefined | string;
  }

  interface HtmlImageTag extends HtmlTag {
    alt?: undefined | string;
    src?: undefined | string;
    crossorigin?: undefined | string;
    usemap?: undefined | string;
    ismap?: undefined | string;
    width?: undefined | string;
    height?: undefined | string;
  }

  interface HtmlInputTag extends HtmlTag {
    accept?: undefined | string;
    action?: undefined | string;
    alt?: undefined | string;
    autocomplete?: undefined | string;
    autofocus?: undefined | string;
    checked?: undefined | string | boolean;
    disabled?: undefined | boolean;
    enctype?: undefined | string;
    form?: undefined | string;
    height?: undefined | string;
    list?: undefined | string;
    max?: undefined | string;
    maxlength?: undefined | string;
    method?: undefined | string;
    min?: undefined | string;
    multiple?: undefined | string;
    name?: undefined | string;
    novalidate?: undefined | string | boolean;
    pattern?: undefined | string;
    placeholder?: undefined | string;
    readonly?: undefined | string;
    required?: undefined | string;
    size?: undefined | string;
    src?: undefined | string;
    step?: undefined | string;
    target?: undefined | string;
    type?: undefined | string;
    value?: undefined | string;
    width?: undefined | string;
  }

  interface HtmlModTag extends HtmlTag {
    cite?: undefined | string;
    datetime?: undefined | string | Date;
  }

  interface KeygenTag extends HtmlTag {
    autofocus?: undefined | string;
    challenge?: undefined | string;
    disabled?: undefined | boolean;
    form?: undefined | string;
    keytype?: undefined | string;
    name?: undefined | string;
  }

  interface HtmlLabelTag extends HtmlTag {
    form?: undefined | string;
    for?: undefined | string;
  }

  interface HtmlLITag extends HtmlTag {
    value?: undefined | string | number;
  }

  interface HtmlLinkTag extends HtmlTag {
    href?: undefined | string;
    crossorigin?: undefined | string;
    rel?: undefined | string;
    media?: undefined | string;
    hreflang?: undefined | string;
    type?: undefined | string;
    sizes?: undefined | string;
    integrity?: undefined | string;
  }

  interface HtmlMapTag extends HtmlTag {
    name?: undefined | string;
  }

  interface HtmlMetaTag extends HtmlTag {
    name?: undefined | string;
    ["http-equiv"]?: undefined | string;
    content?: undefined | string;
    charset?: undefined | string;
  }

  interface HtmlMeterTag extends HtmlTag {
    value?: undefined | string | number;
    min?: undefined | string | number;
    max?: undefined | string | number;
    low?: undefined | string | number;
    high?: undefined | string | number;
    optimum?: undefined | string | number;
  }

  interface HtmlObjectTag extends HtmlTag {
    data?: undefined | string;
    type?: undefined | string;
    name?: undefined | string;
    usemap?: undefined | string;
    form?: undefined | string;
    width?: undefined | string;
    height?: undefined | string;
  }

  interface HtmlOListTag extends HtmlTag {
    reversed?: undefined | string;
    start?: undefined | string | number;
  }

  interface HtmlOptgroupTag extends HtmlTag {
    disabled?: undefined | boolean;
    label?: undefined | string;
  }

  interface HtmlOptionTag extends HtmlTag {
    disabled?: undefined | boolean;
    label?: undefined | string;
    selected?: undefined | string;
    value?: undefined | string;
  }

  interface HtmlOutputTag extends HtmlTag {
    for?: undefined | string;
    form?: undefined | string;
    name?: undefined | string;
  }

  interface HtmlParamTag extends HtmlTag {
    name?: undefined | string;
    value?: undefined | string;
  }

  interface HtmlProgressTag extends HtmlTag {
    value?: undefined | string | number;
    max?: undefined | string | number;
  }

  interface HtmlCommandTag extends HtmlTag {
    type?: undefined | string;
    label?: undefined | string;
    icon?: undefined | string;
    disabled?: undefined | boolean;
    checked?: undefined | string;
    radiogroup?: undefined | string;
    default?: undefined | string;
  }

  interface HtmlLegendTag extends HtmlTag {}

  interface HtmlBrowserButtonTag extends HtmlTag {
    type?: undefined | string;
  }

  interface HtmlMenuTag extends HtmlTag {
    type?: undefined | string;
    label?: undefined | string;
  }

  interface HtmlScriptTag extends HtmlTag {
    src?: undefined | string;
    type?: undefined | string;
    charset?: undefined | string;
    async?: undefined | string | boolean;
    defer?: undefined | string | boolean;
    crossorigin?: undefined | string;
    integrity?: undefined | string;
    text?: undefined | string;
  }

  interface HtmlDetailsTag extends HtmlTag {
    open?: undefined | string;
  }

  interface HtmlSelectTag extends HtmlTag {
    autofocus?: undefined | string;
    disabled?: undefined | boolean;
    form?: undefined | string;
    multiple?: undefined | string;
    name?: undefined | string;
    required?: undefined | string;
    size?: undefined | string;
  }

  interface HtmlSourceTag extends HtmlTag {
    src?: undefined | string;
    type?: undefined | string;
    media?: undefined | string;
  }

  interface HtmlStyleTag extends HtmlTag {
    media?: undefined | string;
    type?: undefined | string;
    disabled?: undefined | boolean;
    scoped?: undefined | string;
  }

  interface HtmlTableTag extends HtmlTag {}

  interface HtmlTableDataCellTag extends HtmlTag {
    colspan?: undefined | string | number;
    rowspan?: undefined | string | number;
    headers?: undefined | string;
  }

  interface HtmlTextAreaTag extends HtmlTag {
    autofocus?: undefined | string;
    cols?: undefined | string;
    dirname?: undefined | string;
    disabled?: undefined | boolean;
    form?: undefined | string;
    maxlength?: undefined | string;
    minlength?: undefined | string;
    name?: undefined | string;
    placeholder?: undefined | string;
    readonly?: undefined | string;
    required?: undefined | string;
    rows?: undefined | string;
    wrap?: undefined | string;
  }

  interface HtmlTableHeaderCellTag extends HtmlTag {
    colspan?: undefined | string | number;
    rowspan?: undefined | string | number;
    headers?: undefined | string;
    scope?: undefined | string;
  }

  interface HtmlTimeTag extends HtmlTag {
    datetime?: undefined | string | Date;
  }

  interface HtmlTrackTag extends HtmlTag {
    default?: undefined | string;
    kind?: undefined | string;
    label?: undefined | string;
    src?: undefined | string;
    srclang?: undefined | string;
  }

  interface HtmlVideoTag extends HtmlTag {
    src?: undefined | string;
    poster?: undefined | string;
    autobuffer?: undefined | string;
    autoplay?: undefined | string;
    loop?: undefined | string;
    controls?: undefined | string;
    width?: undefined | string;
    height?: undefined | string;
  }

  // We allow any attributes on svg because its hard to keep track of them all.
  interface HtmlSvgTag extends HtmlTag, Record<string, any> {}

  interface HtmlUnspecifiedTag extends HtmlTag, Record<string, any> {
    of: string;
  }

  interface HtmlBodyTag {
    onafterprint?: undefined | string;
    onbeforeprint?: undefined | string;
    onbeforeonload?: undefined | string;
    onblur?: undefined | string;
    onerror?: undefined | string;
    onfocus?: undefined | string;
    onhaschange?: undefined | string;
    onload?: undefined | string;
    onmessage?: undefined | string;
    onoffline?: undefined | string;
    ononline?: undefined | string;
    onpagehide?: undefined | string;
    onpageshow?: undefined | string;
    onpopstate?: undefined | string;
    onredo?: undefined | string;
    onresize?: undefined | string;
    onstorage?: undefined | string;
    onundo?: undefined | string;
    onunload?: undefined | string;
  }

  interface HtmlTag {
    oncontextmenu?: undefined | string;
    onkeydown?: undefined | string;
    onkeypress?: undefined | string;
    onkeyup?: undefined | string;
    onclick?: undefined | string;
    ondblclick?: undefined | string;
    ondrag?: undefined | string;
    ondragend?: undefined | string;
    ondragenter?: undefined | string;
    ondragleave?: undefined | string;
    ondragover?: undefined | string;
    ondragstart?: undefined | string;
    ondrop?: undefined | string;
    onmousedown?: undefined | string;
    onmousemove?: undefined | string;
    onmouseout?: undefined | string;
    onmouseover?: undefined | string;
    onmouseup?: undefined | string;
    onmousewheel?: undefined | string;
    onscroll?: undefined | string;
  }

  interface FormEvents {
    onblur?: undefined | string;
    onchange?: undefined | string;
    onfocus?: undefined | string;
    onformchange?: undefined | string;
    onforminput?: undefined | string;
    oninput?: undefined | string;
    oninvalid?: undefined | string;
    onselect?: undefined | string;
    onsubmit?: undefined | string;
  }

  interface HtmlInputTag extends FormEvents {}

  interface HtmlFieldSetTag extends FormEvents {}

  interface HtmlFormTag extends FormEvents {}

  interface MediaEvents {
    onabort?: undefined | string;
    oncanplay?: undefined | string;
    oncanplaythrough?: undefined | string;
    ondurationchange?: undefined | string;
    onemptied?: undefined | string;
    onended?: undefined | string;
    onerror?: undefined | string;
    onloadeddata?: undefined | string;
    onloadedmetadata?: undefined | string;
    onloadstart?: undefined | string;
    onpause?: undefined | string;
    onplay?: undefined | string;
    onplaying?: undefined | string;
    onprogress?: undefined | string;
    onratechange?: undefined | string;
    onreadystatechange?: undefined | string;
    onseeked?: undefined | string;
    onseeking?: undefined | string;
    onstalled?: undefined | string;
    onsuspend?: undefined | string;
    ontimeupdate?: undefined | string;
    onvolumechange?: undefined | string;
    onwaiting?: undefined | string;
  }

  interface HtmlAudioTag extends MediaEvents {}

  interface HtmlEmbedTag extends MediaEvents {}

  interface HtmlImageTag extends MediaEvents {}

  interface HtmlObjectTag extends MediaEvents {}

  interface HtmlVideoTag extends MediaEvents {}

  interface IntrinsicAttributes {}

  interface ElementChildrenAttribute {
    children?: undefined | any;
  }

  interface IntrinsicElements {
    a: HtmlAnchorTag;
    abbr: HtmlTag;
    address: HtmlTag;
    area: HtmlAreaTag;
    article: HtmlTag;
    aside: HtmlTag;
    audio: HtmlAudioTag;
    b: HtmlTag;
    bb: HtmlBrowserButtonTag;
    base: BaseTag;
    bdi: HtmlTag;
    bdo: HtmlTag;
    blockquote: HtmlQuoteTag;
    body: HtmlBodyTag;
    br: HtmlTag;
    button: HtmlButtonTag;
    canvas: HtmlCanvasTag;
    caption: HtmlTag;
    cite: HtmlTag;
    code: HtmlTag;
    col: HtmlTableColTag;
    colgroup: HtmlTableColTag;
    commands: HtmlCommandTag;
    data: DataTag;
    datalist: HtmlDataListTag;
    dd: HtmlTag;
    del: HtmlModTag;
    details: HtmlDetailsTag;
    dfn: HtmlTag;
    div: HtmlTag;
    dl: HtmlTag;
    dt: HtmlTag;
    em: HtmlTag;
    embed: HtmlEmbedTag;
    fieldset: HtmlFieldSetTag;
    figcaption: HtmlTag;
    figure: HtmlTag;
    footer: HtmlTag;
    form: HtmlFormTag;
    hgroup: HtmlTag;
    h1: HtmlTag;
    h2: HtmlTag;
    h3: HtmlTag;
    h4: HtmlTag;
    h5: HtmlTag;
    h6: HtmlTag;
    head: HtmlTag;
    header: HtmlTag;
    hr: HtmlTag;
    html: HtmlHtmlTag;
    i: HtmlTag;
    iframe: HtmlIFrameTag;
    img: HtmlImageTag;
    input: HtmlInputTag;
    ins: HtmlModTag;
    kbd: HtmlTag;
    keygen: KeygenTag;
    label: HtmlLabelTag;
    legend: HtmlLegendTag;
    li: HtmlLITag;
    link: HtmlLinkTag;
    main: HtmlTag;
    map: HtmlMapTag;
    mark: HtmlTag;
    menu: HtmlMenuTag;
    meta: HtmlMetaTag;
    meter: HtmlMeterTag;
    nav: HtmlTag;
    noscript: HtmlTag;
    object: HtmlObjectTag;
    ol: HtmlOListTag;
    optgroup: HtmlOptgroupTag;
    option: HtmlOptionTag;
    output: HtmlOutputTag;
    p: HtmlTag;
    param: HtmlParamTag;
    pre: HtmlTag;
    progress: HtmlProgressTag;
    q: HtmlQuoteTag;
    rb: HtmlTag;
    rp: HtmlTag;
    rt: HtmlTag;
    rtc: HtmlTag;
    ruby: HtmlTag;
    s: HtmlTag;
    samp: HtmlTag;
    script: HtmlScriptTag;
    section: HtmlTag;
    select: HtmlSelectTag;
    small: HtmlTag;
    summary: HtmlTag;
    source: HtmlSourceTag;
    span: HtmlTag;
    strong: HtmlTag;
    style: HtmlStyleTag;
    sub: HtmlTag;
    sup: HtmlTag;
    svg: HtmlSvgTag;
    table: HtmlTableTag;
    tbody: HtmlTag;
    td: HtmlTableDataCellTag;
    template: HtmlTag;
    textarea: HtmlTextAreaTag;
    tfoot: HtmlTableSectionTag;
    th: HtmlTableHeaderCellTag;
    thead: HtmlTableSectionTag;
    time: HtmlTimeTag;
    title: HtmlTag;
    tr: HtmlTableRowTag;
    track: HtmlTrackTag;
    u: HtmlTag;
    ul: HtmlTag;
    var: HtmlTag;
    video: HtmlVideoTag;
    wbr: HtmlTag;
    tag: HtmlUnspecifiedTag;
  }
}
