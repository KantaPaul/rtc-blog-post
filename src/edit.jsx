import {
	ColorPaletteControl,
	InspectorControls,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Notice,
	PanelBody,
	Spinner,
	ToggleControl,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Edit({ attributes, setAttributes }) {
	const {
		showFeaturedImage,
		showDate,
		showTitle,
		showMeta,
		showAuthor,
		titleColor,
		dateColor,
		metaColor,
		authorTitleColor,
		authorDescColor,
	} = attributes;
	const blockProps = useBlockProps();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("https://wptavern.com/wp-json/wp/v2/posts?_embed")
			.then((response) => {
				if (!response?.ok) {
					throw new Error("Network response was not ok");
				}
				return response?.json();
			})
			.then((posts) => {
				setPosts(posts);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setError(
					__("Error fetching posts. Please try again later.", "blog-post"),
				);
				setLoading(false);
			});
	}, []);

	const colorSettings = [
		{
			label: __("Title color", "blog-post"),
			color: titleColor,
			onChange: (value) => setAttributes({ titleColor: value }),
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
		<div {...blockProps}>
			{loading ? (
				<Spinner />
			) : error ? (
				<Notice status="error" isDismissible={false}>
					{error}
				</Notice>
			) : (
				posts?.map((post, index) => (
					<div key={index}>
						{showFeaturedImage ? (
							<a href={post?.link}>
								{post?._embedded?.["wp:featuredmedia"]
									?.slice(0, 1)
									?.map((item, index) => {
										return (
											<img
												key={index}
												src={item?.media_details?.sizes?.full?.source_url}
												alt={post?.title?.rendered}
											/>
										);
									})}
							</a>
						) : (
							""
						)}
						{showDate ? (
							<p style={{ color: dateColor }}>
								{dayjs().to(dayjs.utc(post?.date).tz(dayjs.tz.guess()))}
							</p>
						) : (
							""
						)}

						{showTitle ? (
							<h2>
								<a style={{ color: titleColor }} href={post?.link}>
									{post?.title?.rendered}
								</a>
							</h2>
						) : (
							""
						)}

						{showMeta
							? post?._embedded?.["wp:term"]?.map((item) =>
									item?.map((data, index) => (
										<div key={index}>
											<a href={data?.link} style={{ color: metaColor }}>
												{data?.name}
											</a>
										</div>
									)),
								)
							: ""}
						{showAuthor
							? post?._embedded?.author?.map((item, index) => (
									<div key={index}>
										<h3>
											<a style={{ color: authorTitleColor }} href={item?.link}>
												{item?.name}
											</a>
										</h3>
										<p style={{ color: authorDescColor }}>
											{item?.description}
										</p>
										<a href={item?.url}>
											<img src={item?.avatar_urls?.[96]} alt={item?.name} />
										</a>
									</div>
								))
							: ""}
					</div>
				))
			)}
			<InspectorControls>
				{/* General settings */}
				<PanelBody
					title={__("Content control settings", "blog-post")}
					initialOpen={true}
				>
					<ToggleControl
						label={__("Show featured image", "blog-post")}
						checked={showFeaturedImage}
						onChange={(value) => setAttributes({ showFeaturedImage: value })}
						help="Show and hide the featured image in front end."
					/>
					<ToggleControl
						label={__("Show date", "blog-post")}
						checked={showDate}
						onChange={(value) => setAttributes({ showDate: value })}
						help="Show and hide the date in front end."
					/>
					<ToggleControl
						label={__("Show title", "blog-post")}
						checked={showTitle}
						onChange={(value) => setAttributes({ showTitle: value })}
						help="Show and hide the title in front end."
					/>
					<ToggleControl
						label={__("Show meta", "blog-post")}
						checked={showMeta}
						onChange={(value) => setAttributes({ showMeta: value })}
						help="Show and hide the meta in front end."
					/>
					<ToggleControl
						label={__("Show author", "blog-post")}
						checked={showAuthor}
						onChange={(value) => setAttributes({ showAuthor: value })}
						help="Show and hide the author in front end."
					/>
				</PanelBody>

				{/* Color settings */}
				<PanelBody
					title={__("Color settings", "blog-post")}
					initialOpen={false}
				>
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
		</div>
	);
}
