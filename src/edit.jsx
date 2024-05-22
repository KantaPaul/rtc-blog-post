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
	__experimentalInputControl as InputControl,
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

	const [activeIndex, setActiveIndex] = useState(0);

	const visibleSlides = posts?.slice(
		activeIndex,
		activeIndex + Number(sliderItemCount),
	);

	const goToPrevSlide = () => {
		setActiveIndex(
			(prevIndex) => (prevIndex - 1 + posts?.length) % posts?.length,
		);
	};

	const goToNextSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % posts?.length);
	};

	return (
		<div {...blockProps}>
			{loading ? (
				<Spinner />
			) : error ? (
				<Notice status="error" isDismissible={false}>
					{error}
				</Notice>
			) : (
				<div className="post_carousel_wrapper">
					<button
						disabled={
							activeIndex === 0 ||
							visibleSlides?.length < Number(sliderItemCount)
						}
						onClick={goToPrevSlide}
						className="post_slider_btn post_slider_prev_btn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-chevron-left"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
					</button>
					<div
						className="posts_wrapper editor_posts_wrapper"
						style={{
							gridTemplateColumns: `repeat(${sliderItemCount}, minmax(0, 1fr))`,
						}}
					>
						{visibleSlides?.map((post, index) => (
							<div key={index} className="post_wrapper">
								{showFeaturedImage &&
								post?._embedded?.["wp:featuredmedia"]?.length !== 0 ? (
									<a
										href={post?.link}
										className="post_featured_image"
										onClick={(e) => e.preventDefault()}
									>
										{post?._embedded?.["wp:featuredmedia"]
											?.slice(0, 1)
											?.map((item, index) => {
												return item?.media_details?.sizes?.full?.source_url ? (
													<img
														key={index}
														src={item?.media_details?.sizes?.full?.source_url}
														alt={post?.title?.rendered}
													/>
												) : (
													""
												);
											})}
									</a>
								) : (
									""
								)}

								<div className="post_content">
									{showDate && post?.date ? (
										<p style={{ color: dateColor }} className="post_date">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="1em"
												height="1em"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="lucide lucide-clock-1"
											>
												<circle cx="12" cy="12" r="10" />
												<polyline points="12 6 12 12 14.5 8" />
											</svg>
											{dayjs().to(dayjs.utc(post?.date).tz(dayjs.tz.guess()))}
										</p>
									) : (
										""
									)}

									{showMeta && post?._embedded?.["wp:term"]?.length !== 0 ? (
										<div className="post_terms">
											{post?._embedded?.["wp:term"]?.map((item) =>
												item?.map((data, index) =>
													data?.name ? (
														<div key={index} className="post_term">
															<a
																href={data?.link}
																style={{ color: metaColor }}
																onClick={(e) => e.preventDefault()}
															>
																{data?.name}
															</a>
															<span className="post_separator">,</span>
														</div>
													) : (
														""
													),
												),
											)}
										</div>
									) : (
										""
									)}

									{showTitle && post?.title?.rendered ? (
										<h2 className="post_title">
											<a
												style={{ color: titleColor }}
												href={post?.link}
												onClick={(e) => e.preventDefault()}
											>
												{post?.title?.rendered}
											</a>
										</h2>
									) : (
										""
									)}

									{showDesc && post?.excerpt?.rendered ? (
										<p
											style={{ color: descColor }}
											dangerouslySetInnerHTML={{
												__html: post?.excerpt?.rendered,
											}}
											className="post_desc"
										/>
									) : (
										""
									)}

									{showAuthor && post?._embedded?.author?.length !== 0 ? (
										<div className="post_authors">
											{post?._embedded?.author?.map((item, index) => (
												<div key={index} className="post_author">
													{item?.avatar_urls?.[96] ? (
														<a
															href={item?.url}
															onClick={(e) => e.preventDefault()}
															className="post_author_avatar"
														>
															<img
																src={item?.avatar_urls?.[96]}
																alt={item?.name}
															/>
														</a>
													) : (
														""
													)}
													<div className="post_author_content">
														{item?.name ? (
															<h3 className="post_author_title">
																<a
																	style={{ color: authorTitleColor }}
																	href={item?.link}
																	onClick={(e) => e.preventDefault()}
																>
																	{item?.name}
																</a>
															</h3>
														) : (
															""
														)}
														{item?.description ? (
															<p
																style={{ color: authorDescColor }}
																dangerouslySetInnerHTML={{
																	__html: item?.description,
																}}
																className="post_author_desc"
															/>
														) : (
															""
														)}
													</div>
												</div>
											))}
										</div>
									) : (
										""
									)}
								</div>
							</div>
						))}
					</div>
					<button
						onClick={goToNextSlide}
						className="post_slider_btn post_slider_next_btn"
						disabled={posts?.length - Number(sliderItemCount) === activeIndex}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-chevron-right"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>
				</div>
			)}
			<InspectorControls>
				{/* General settings */}
				<PanelBody
					title={__("Content control settings", "blog-post")}
					initialOpen={true}
				>
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
						help="Show and hide the featured image in front end."
					/>
					<ToggleControl
						label={__("Show date", "blog-post")}
						checked={showDate}
						onChange={(value) => setAttributes({ showDate: value })}
						help="Show and hide the date in front end."
					/>
					<ToggleControl
						label={__("Show meta", "blog-post")}
						checked={showMeta}
						onChange={(value) => setAttributes({ showMeta: value })}
						help="Show and hide the meta in front end."
					/>
					<ToggleControl
						label={__("Show title", "blog-post")}
						checked={showTitle}
						onChange={(value) => setAttributes({ showTitle: value })}
						help="Show and hide the title in front end."
					/>
					<ToggleControl
						label={__("Show desc", "blog-post")}
						checked={showDesc}
						onChange={(value) => setAttributes({ showDesc: value })}
						help="Show and hide the desc in front end."
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
