export interface Title {
	rendered: string;
}

export interface Content {
	rendered: string;
	protected: boolean;
}

export interface Excerpt {
	rendered: string;
	protected: boolean;
}

export interface Post {
	id: number;
	date: string;
	date_gmt: string;
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: Title;
	content: Content;
	excerpt: Excerpt;
	author: number;
	featured_media: number;
	comment_status: string;
	ping_status: string;
	sticky: boolean;
	template: string;
	format: string;
	categories: number[];
	tags: number[];
	_embedded: Embedded;
}

export interface Embedded {
	author: Author2[];
	"wp:featuredmedia": Featured[];
	"wp:term": WpTerm2[][];
}

export interface Author2 {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: AvatarUrls;
}

export interface AvatarUrls {
	"24": string;
	"48": string;
	"96": string;
}

export interface Featured {
	link: string;
	media_details: MediaDetails;
}

export interface WpTerm2 {
	link: string;
	name: string;
	taxonomy: string;
}

export interface MediaDetails {
	width: number;
	height: number;
	file: string;
	filesize?: number;
	sizes: Sizes;
}

export interface Sizes {
	full: Full;
}

export interface Full {
	file: string;
	width: number;
	height: number;
	mime_type: string;
	source_url: string;
}
