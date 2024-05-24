import { LeftArrow } from "./icons/left-arrow";

const PrevSlideBtn = ({ disabled, onClick }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className="post_slider_btn post_slider_prev_btn"
		>
			<LeftArrow />
		</button>
	);
};

export default PrevSlideBtn;
