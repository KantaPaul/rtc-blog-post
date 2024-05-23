<?php
extract($attributes);
$posts = fetch_wp_tavern_posts();
?>

<div class="post_carousel_wrapper" style="--sliderCount: <?php echo esc_attr($sliderItemCount); ?>">
    <button class="post_slider_btn post_slider_prev_btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
        </svg>
    </button>
    <div class="post_carousel_inner">
        <div class="posts_wrapper front_posts_wrapper" data-sliderCount="<?php echo esc_attr($sliderItemCount) ?>">
            <?php if (!empty($posts) && is_array($posts)) { ?>
                <?php foreach ($posts as $key => $post) { ?>
                    <div class="post_wrapper">
                        <?php if ($showFeaturedImage && !empty($post->_embedded->{"wp:featuredmedia"})) { ?>
                            <a href="<?php echo esc_url($post->link) ?>" class="post_featured_image">
                                <?php foreach ($post->_embedded->{"wp:featuredmedia"} as $key => $item) { ?>
                                    <?php if ($item->media_details->sizes->full->source_url) { ?>
                                        <img src="<?php echo esc_url($item->media_details->sizes->full->source_url) ?>" alt="<?php echo esc_attr($post->title->rendered) ?>" />
                                    <?php } ?>
                                <?php } ?>
                            </a>
                        <?php } ?>
                        <div class="post_content">
                            <?php if ($showDate && $post->date) { ?>
                                <p style="color: <?php echo esc_attr($dateColor); ?>" class="post_date">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-1">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 14.5 8" />
                                    </svg>
                                    <?php
                                    $date = date_create($post->date);
                                    echo esc_html(date_format($date, "d F, Y")); ?>
                                </p>
                            <?php } ?>

                            <?php if ($showMeta && !empty($post->_embedded->{"wp:term"})) { ?>
                                <div class="post_terms">
                                    <?php foreach ($post->_embedded->{"wp:term"} as $key => $data) { ?>
                                        <?php if (!empty($data)) { ?>
                                            <?php foreach ($data as $key => $item) { ?>
                                                <div class="post_term">
                                                    <a href="<?php echo esc_url($item->link) ?>" style="color: <?php echo esc_attr($metaColor); ?>">
                                                        <?php echo esc_html($item->name) ?>
                                                    </a>
                                                    <span class="post_separator">,</span>
                                                </div>
                                            <?php } ?>
                                        <?php } ?>
                                    <?php } ?>
                                </div>
                            <?php } ?>

                            <?php if ($showTitle && $post->title->rendered) { ?>
                                <h2 class="post_title">
                                    <a style="color: <?php echo esc_attr($titleColor); ?>" href="<?php echo esc_url($post->link) ?>">
                                        <?php echo esc_html($post->title->rendered) ?>
                                    </a>
                                </h2>
                            <?php } ?>

                            <?php if ($showDesc && $post->excerpt->rendered) { ?>
                                <div style="color: <?php echo esc_attr($descColor); ?>" class="post_desc">
                                    <?php echo wp_kses_post($post->excerpt->rendered); ?>
                                </div>
                            <?php } ?>

                            <?php if ($showAuthor && !empty($post->_embedded->author)) { ?>
                                <div class="post_authors">
                                    <?php foreach ($post->_embedded->author as $key => $item) { ?>
                                        <div class="post_author">
                                            <?php if ($item->avatar_urls->{96}) { ?>
                                                <a href="<?php echo esc_url($item->url) ?>" class="post_author_avatar">
                                                    <img src="<?php echo esc_url($item->avatar_urls->{96}) ?>" alt="<?php echo esc_attr($item->name) ?>" />
                                                </a>
                                            <?php } ?>
                                            <div class="post_author_content">
                                                <?php if ($item->name) { ?>
                                                    <h3 class="post_author_title">
                                                        <a style="color: <?php echo esc_attr($authorTitleColor); ?>" href="<?php echo esc_url($item->link) ?>">
                                                            <?php echo esc_html($item->name) ?>
                                                        </a>
                                                    </h3>
                                                <?php } ?>

                                                <?php if ($item->description) { ?>
                                                    <div style="color: <?php echo esc_attr($authorDescColor); ?>" class="post_author_desc">
                                                        <?php echo wp_kses_post($item->description); ?>
                                                    </div>
                                                <?php } ?>
                                            </div>
                                        </div>
                                    <?php } ?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                <?php } ?>
            <?php } ?>
        </div>
    </div>
    <button class="post_slider_btn post_slider_next_btn front_next_slider_btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
        </svg>
    </button>
</div>