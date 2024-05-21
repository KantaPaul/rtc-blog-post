<?php

/**
 * Plugin Name:       Blog Post
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            https://github.com/KantaPaul
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blog-post
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_blog_post_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_blog_post_block_init' );
function fetch_wptavern_posts() {
    $api_url = 'https://wptavern.com/wp-json/wp/v2/posts';

    // Make the GET request
    $response = wp_remote_get($api_url);

    // Check for errors
    if (is_wp_error($response)) {
        $error_message = $response->get_error_message();
        return "Something went wrong: $error_message";
    }

    // Get the body of the response
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response
    $posts = json_decode($body);

    // Check if decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'Failed to decode JSON: ' . json_last_error_msg();
    }

    // Return the posts or process them as needed
    return $posts;
}

