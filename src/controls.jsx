import {
	ColorPaletteControl,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	__experimentalInputControl as InputControl,
	PanelBody,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const Controls = ({ attributes, setAttributes, setActiveIndex }) => {
	const {
		sliderItemCount,
		showFeaturedImage,
		showDate,
		showTitle,
		showDesc,
		showMeta,
		showAuthor,
		titleColor,
		descColor,
		dateColor,
		metaColor,
		authorTitleColor,
		authorDescColor,
		siteContent,
	} = attributes;

	const colorSettings = [
		{
			label: __("Title color", "blog-post"),
			color: titleColor,
			onChange: (value) => setAttributes({ titleColor: value }),
		},
		{
			label: __("Description color", "blog-post"),
			color: descColor,
			onChange: (value) => setAttributes({ descColor: value }),
		},
		{
			label: __("Date color", "blog-post"),
			color: dateColor,
			onChange: (value) => setAttributes({ dateColor: value }),
		},
		{
			label: __("Meta color", "blog-post"),
			color: metaColor,
			onChange: (value) => setAttributes({ metaColor: value }),
		},
		{
			label: __("Author title color", "blog-post"),
			color: authorTitleColor,
			onChange: (value) => setAttributes({ authorTitleColor: value }),
		},
		{
			label: __("Author desc color", "blog-post"),
			color: authorDescColor,
			onChange: (value) => setAttributes({ authorDescColor: value }),
		},
	];

	return (
		<InspectorControls>
			{/* General settings */}
			<PanelBody
				title={__("Content control settings", "blog-post")}
				initialOpen={true}
			>
				<InputControl
					value={siteContent}
					onChange={(value) => {
						setAttributes({ siteContent: value ?? "wptavern.com" });
					}}
					label={__("Slider content", "blog-post")}
				/>
				<InputControl
					value={sliderItemCount}
					onChange={(nextValue) => {
						setAttributes({ sliderItemCount: nextValue });
						setActiveIndex(0);
					}}
					type="number"
					label={__("Slider items count", "blog-post")}
					max={5}
					min={1}
				/>
				<ToggleControl
					label={__("Show featured image", "blog-post")}
					checked={showFeaturedImage}
					onChange={(value) => setAttributes({ showFeaturedImage: value })}
					help={__(
						"Show and hide the featured image in front end.",
						"blog-post",
					)}
				/>
				<ToggleControl
					label={__("Show date", "blog-post")}
					checked={showDate}
					onChange={(value) => setAttributes({ showDate: value })}
					help={__("Show and hide the date in front end.", "blog-post")}
				/>
				<ToggleControl
					label={__("Show meta", "blog-post")}
					checked={showMeta}
					onChange={(value) => setAttributes({ showMeta: value })}
					help={__("Show and hide the meta in front end.", "blog-post")}
				/>
				<ToggleControl
					label={__("Show title", "blog-post")}
					checked={showTitle}
					onChange={(value) => setAttributes({ showTitle: value })}
					help={__("Show and hide the title in front end.", "blog-post")}
				/>
				<ToggleControl
					label={__("Show desc", "blog-post")}
					checked={showDesc}
					onChange={(value) => setAttributes({ showDesc: value })}
					help={__("Show and hide the desc in front end.", "blog-post")}
				/>
				<ToggleControl
					label={__("Show author", "blog-post")}
					checked={showAuthor}
					onChange={(value) => setAttributes({ showAuthor: value })}
					help={__("Show and hide the author in front end.", "blog-post")}
				/>
			</PanelBody>

			{/* Color settings */}
			<PanelBody title={__("Color settings", "blog-post")} initialOpen={false}>
				{colorSettings.map((palette) => (
					<ColorPaletteControl
						key={palette.label}
						label={palette.label}
						value={palette.color}
						onChange={palette.onChange}
					/>
				))}
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
