
const fontsmixin = 
`@mixin font($font_name, $file_name, $weight, $style) {
    @font-face {
        font-family: $font_name;
        font-display: swap;
        src: url("../fonts/#{$file_name}.woff") format("woff"), url("../fonts/#{$file_name}.woff2") format("woff2");
        font-weight: #{$weight};
        font-style: #{$style};
    }
}`

exports.fontsmixin = fontsmixin
