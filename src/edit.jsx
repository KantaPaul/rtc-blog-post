import { useBlockProps } from "@wordpress/block-editor";
import { Notice, Spinner } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Controls from "./controls";
import NextSlideBtn from "./next-slide-btn";
import Post from "./post";
import PrevSlideBtn from "./prev-slide-btn";

export default function Edit({ attributes, setAttributes }) {
	const { sliderItemCount, siteContent } = attributes;
	const blockProps = useBlockProps();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refetch, setReFetch] = useState(false);

	useEffect(() => {
		fetch(`https://${siteContent}/wp-json/wp/v2/posts?_embed`)
			.then((response) => {
				if (!response?.ok) {
					throw new Error("Network response was not ok");
				}
				return response?.json();
			})
			.then((posts) => {
				setPosts(posts);
				setLoading(false);
				setReFetch(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setError(
					__("Error fetching posts. Please try again later.", "blog-post"),
				);
				setLoading(false);
			});
	}, [siteContent, refetch]);

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
					<span
						onClick={() => {
							setReFetch(true);
							setError(null);
						}}
						className="refetchBtn"
					>
						Refetch
					</span>
				</Notice>
			) : (
				<div className="post_carousel_wrapper">
					<PrevSlideBtn
						disabled={
							activeIndex === 0 ||
							visibleSlides?.length < Number(sliderItemCount)
						}
						onClick={goToPrevSlide}
					/>
					<div
						className="posts_wrapper editor_posts_wrapper"
						style={{
							gridTemplateColumns: `repeat(${sliderItemCount}, minmax(0, 1fr))`,
						}}
					>
						{visibleSlides?.map((post, index) => (
							<Post post={post} key={index} attributes={attributes} />
						))}
					</div>
					<NextSlideBtn
						onClick={goToNextSlide}
						disabled={posts?.length - Number(sliderItemCount) === activeIndex}
					/>
				</div>
			)}
			<Controls
				attributes={attributes}
				setActiveIndex={setActiveIndex}
				setAttributes={setAttributes}
			/>
		</div>
	);
}
