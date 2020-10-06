export const
name   = 'typescript-docs.styl',
path   = './' + name,
source =
/* stylus */
String.raw`/* ==UserStyle==
@name           TypeScript Docs
@description    Expands width of code blocks and moves navigation bar fully to the left
@version        0.0.12
@namespace      github.com/disk0/stylus/typescript.org/docs

@author         disk0 (github.com/disco0)
@license        MIT

@preprocessor   stylus

@var select     CodeFont "Font for code displayed on page." [
  "Iosevka Extended*",
  "Iosevka Expanded",
  "Iosevka Term",
  "Iosevka",

  "SemanticHaskell",
  "SemanticJavascript",
  "SemanticCode",
  "Hasklig",

  "PragmataPro Mono Liga",

  "monospace"
]
@var number     CodeFontSize   "Size of code in documentation"          [ 14, 1, 500, 1, "px" ]
@var number     CodeFontWeight "Code font weight"                       [ 400, 100, 900, 100 ]
@var number     DocTextWidth   "Width of text content in documentation" [ 1000, 300, 5000, 100, "px" ]
==/UserStyle== */

@-moz-document regexp("https?://(www\\.)?typescriptlang.org/(v2/)?docs.*$"),
               regexp("https?://(www\\.)?(staging-)?typescript\\.org/docs/.*$")

	$FontFaceMap = { IosevkaExtended: {
			font-feature-settings: "ss08" on
			title: "Iosevka Extended"
			src: 'Iosevka %sExtended'
			weights: { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700, ExtraBold: 800, Heavy: 900 }
			default: {
				src: local("Iosevka Extended")
				font-weight: normal
				font-style: normal
			}
		} }
	loadFontFaceMap($FontFace)
		for name, $Font in $FontFaceMap
			$ffs = $Font["font-feature-settings"]
			if ($Font.default)
				@font-face
					font-family: $Font.title || $Font.src
					// Conditional
					font-feature-settings: $ffs unless (!$ffs)
					for $style, $value in $Font.default
						{$style}: $value

			for $type, $weight in $Font.weights
				@font-face
					font-family: $Font.title || $Font.src
					src:         'local("%s")' % ( $Font.src % unquote( join( '', $type, ' ' ) ) )
					font-weight: $weight
					// Conditional
					font-feature-settings: $ffs unless (!$ffs)

	loadFontFaceMap($FontFaceMap.IosevkaExtended)
	// #endregion Font Mapping

	// #region Code Styler
	codeStyle(size = false)
		font-family:    CodeFont, monospace 	!important
		font-weight:    CodeFontWeight
		if CodeLetterSpacing > 0em
			letter-spacing: CodeLetterSpacing   !important
		if(size)
			font-size:      size != true ? size !important : CodeFontSize !important
			if CodeFontSize > 0
				line-height: CodeFontSize * 1.3	!important

	// #endregion Code Styler


	// article .docs-container // pre
	// 		// codeStyle(true)
	// 		// & code
	// 			// codeStyle(true)
	// 	background-color: #FAFAFA !important
	// 	.code-container
	// 		background-color: @background-color

	h1,h2,h3,h4,h5
		code
			codeStyle()

	p,ol,li
		code
			codeStyle()
			padding: 			0.05em 0.225em
			border-radius: 		0.15em
			background-color: #F7F7F7		  !important
			font-size: 			CodeFontSize 	!important


	/* Syntax highlighting styles */
	.hljs-
		&function
		&interface
			color: #333

		&keyword
			color: #0000CC
			font-weight: bold

		&title
			color: #318495

		&params
			color: #318495

		&built_in
			color: #CF0E00
			font-weight: 700

		&string
			color: #036A07
			font-weight: 600

		&comment
			color: #408CFF

		&tag
			color: initial

			text-decoration: solid underline
			color: #1a0dab

			.hljs-keyword
				color: initial
				text-decoration: unset !important


		&number
			color: #CF0E00

	/* REDESIGN: Syntax highlighting styles */
	code
		.default
			color: #000
			// font-weight: 500 !important

		.keyword
			color: #0000CC !important
			font-weight: bold !important

		// &title
		// 	color: #318495

		.variable
			color: #318495

		// &built_in
		// 	color: #CF0E00
		// 	font-weight: 700

		.string
			color: #036A07
			font-weight: 600

		.comment
			color: #408CFF
			font-style: oblique
			font-weight: 500 !important

// 		&tag
// 			color: initial

// 			text-decoration: solid underline
// 			color: #1a0dab

// 			.hljs-keyword
// 				color: initial
// 				text-decoration: unset !important


		.number
			color: #CF0E00
			font-weight: 600 !important

	@media(min-width: 0px)
		/**
		 * Expand article container
		 *   - Moves navigation to left edge
		 */
		#main-content > #doc-content > div.container
			width: 100vw

		/* Code Blocks */
		.docs-container pre code,
		div.code-container > code
			codeStyle(true)
			span
				codeStyle(true)

	/* Now restrict only the paragraphs */
	article > p
		max-width: DocTextWidth
		/* Resize code tokens inside paragraphs */
		code
			vertical-align: baseline !important
			align-text:     top      !important

			margin-bottom:  0px
			margin-top:     0px

			padding-bottom: 0px
			padding-top:    0px
`

module.exports = {name, source, path}

export default module.exports;
