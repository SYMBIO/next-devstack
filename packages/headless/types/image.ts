enum ImgixParamsAuto {
    enhance = 'enhance',
    format = 'format',
    redeye = 'redeye',
    compress = 'compress',
}

enum ImgixParamsBlendAlign {
    top = 'top',
    bottom = 'bottom',
    middle = 'middle',
    left = 'left',
    right = 'right',
    center = 'center',
}

enum ImgixParamsBlendCrop {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    faces = 'faces',
}

enum ImgixParamsBlendFit {
    clamp = 'clamp',
    clip = 'clip',
    crop = 'crop',
    scale = 'scale',
    max = 'max',
}

enum ImgixParamsBlendMode {
    color = 'color',
    burn = 'burn',
    dodge = 'dodge',
    darken = 'darken',
    difference = 'difference',
    exclusion = 'exclusion',
    hardlight = 'hardlight',
    hue = 'hue',
    lighten = 'lighten',
    luminosity = 'luminosity',
    multiply = 'multiply',
    overlay = 'overlay',
    saturation = 'saturation',
    screen = 'screen',
    softlight = 'softlight',
    normal = 'normal',
}

enum ImgixParamsBlendSize {
    inherit = 'inherit',
}

enum ImgixParamsCh {
    width = 'width',
    dpr = 'dpr',
    saveData = 'saveData',
}

export enum ImgixParamsCrop {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    faces = 'faces',
    entropy = 'entropy',
    edges = 'edges',
    focalpoint = 'focalpoint',
}

enum ImgixParamsCs {
    srgb = 'srgb',
    adobergb1998 = 'adobergb1998',
    tinysrgb = 'tinysrgb',
    strip = 'strip',
}

enum ImgixParamsFill {
    solid = 'solid',
    blur = 'blur',
}

export enum ImgixParamsFit {
    clamp = 'clamp',
    clip = 'clip',
    crop = 'crop',
    facearea = 'facearea',
    fill = 'fill',
    fillmax = 'fillmax',
    max = 'max',
    min = 'min',
    scale = 'scale',
}

enum ImgixParamsFlip {
    h = 'h',
    v = 'v',
    hv = 'hv',
}

enum ImgixParamsFm {
    gif = 'gif',
    jpg = 'jpg',
    jp2 = 'jp2',
    json = 'json',
    jxr = 'jxr',
    pjpg = 'pjpg',
    mp4 = 'mx4',
    png = 'png',
    png8 = 'pn8',
    png32 = 'png32',
    webp = 'webp',
    webm = 'webm',
}

enum ImgixParamsMarkAlign {
    top = 'top',
    bottom = 'bottom',
    middle = 'middle',
    left = 'left',
    right = 'right',
    center = 'center',
}

enum ImgixParamsMarkFit {
    clip = 'clip',
    crop = 'crop',
    fill = 'fill',
    max = 'max',
    scale = 'scale',
}

enum ImgixParamsPalette {
    css = 'css',
    json = 'json',
}

enum ImgixParamsTransparency {
    grid = 'grid',
}

enum ImgixParamsTrim {
    auto = 'auto',
    color = 'color',
}

enum ImgixParamsTxtAlign {
    top = 'top',
    bottom = 'bottom',
    middle = 'middle',
    left = 'left',
    right = 'right',
    center = 'center',
}

enum ImgixParamsTxtClip {
    start = 'start',
    middle = 'middle',
    end = 'end',
    ellipsis = 'ellipsis',
}

enum ImgixParamsTxtFit {
    max,
}

interface ImgixParams {
    ar: string;
    auto: ImgixParamsAuto;
    bg: string;
    blendAlign: ImgixParamsBlendAlign;
    blendAlpha: number;
    blendColor: string;
    blendCrop: ImgixParamsBlendCrop;
    blendFit: ImgixParamsBlendFit;
    blendH: number;
    blendMode: ImgixParamsBlendMode;
    blendPad: number;
    blendSize: ImgixParamsBlendSize;
    blendW: number;
    blendX: number;
    blendY: number;
    blend: string;
    blur: number;
    borderBottom: number;
    borderLeft: number;
    borderRadiusInner: string;
    borderRadius: string;
    borderRight: number;
    borderTop: number;
    border: string;
    bri: number;
    ch: ImgixParamsCh;
    chromasub: number;
    colorquant: number;
    colors: number;
    con: number;
    cornerRadius: string;
    crop: ImgixParamsCrop;
    cs: ImgixParamsCs;
    dl: string;
    dpi: number;
    dpr: number;
    duotoneAlpha: number;
    duotone: string;
    exp: number;
    expires: number;
    faceindex: number;
    facepad: number;
    faces: number;
    fillColor: string;
    fill: ImgixParamsFill;
    fit: ImgixParamsFit;
    flip: ImgixParamsFlip;
    fm: ImgixParamsFm;
    fpDebug: boolean;
    fpX: number;
    fpY: number;
    fpZ: number;
    gam: number;
    gridColors: string;
    gridSize: number;
    h: number;
    high: number;
    htn: number;
    hue: number;
    invert: boolean;
    lossless: boolean;
    markAlign: ImgixParamsMarkAlign;
    markAlpha: number;
    markBase: string;
    markFit: ImgixParamsMarkFit;
    markH: number;
    markPad: number;
    markScale: number;
    markW: number;
    markX: number;
    markY: number;
    mark: string;
    maskBg: string;
    mask: string;
    maxH: number;
    maxW: number;
    minH: number;
    minW: number;
    monochrome: string;
    nr: number;
    nrs: number;
    orient: number;
    padBottom: number;
    padLeft: number;
    padRight: number;
    padTop: number;
    pad: number;
    page: number;
    palette: ImgixParamsPalette;
    prefix: string;
    px: number;
    q: number;
    rect: string;
    rot: number;
    sat: number;
    sepia: number;
    shad: number;
    sharp: number;
    transparency: ImgixParamsTransparency;
    trimColor: string;
    trimMd: number;
    trimPad: number;
    trimSd: number;
    trimTol: number;
    trim: ImgixParamsTrim;
    txtAlign: ImgixParamsTxtAlign;
    txtClip: ImgixParamsTxtClip;
    txtColor: string;
    txtFit: ImgixParamsTxtFit;
    txtFont: string;
    txtLead: number;
    txtLig: number;
    txtLineColor: string;
    txtLine: number;
    txtPad: number;
    txtShad: number;
    txtSize: number;
    txtTrack: number;
    txtWidth: number;
    txt: string;
    usm: number;
    usmrad: number;
    vib: number;
    w: number;
}

export type ImgixProps = Partial<ImgixParams>;
