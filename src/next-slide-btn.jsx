import { RightArrow } from "./icons/right-arrow";

const NextSlideBtn = ({ onClick, disabled }) => {
	return (
		<button
			onClick={onClick}
			className="post_slider_btn post_slider_next_btn"
			disabled={disabled}
		>
			<RightArrow />
		</button>
	);
};

export default NextSlideBtn;
