import { Clock } from "./icons/clock";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const Post = ({ post, attributes }) => {
	const {
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
	return (
		<div className="post_wrapper">
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
						<Clock />
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
										<img src={item?.avatar_urls?.[96]} alt={item?.name} />
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
	);
};

export default Post;
