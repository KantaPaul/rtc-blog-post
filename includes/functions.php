<?php

function fetch_wp_tavern_posts($params = "wptavern.com")
{
    $api_url = 'https://' . $params . '/wp-json/wp/v2/posts?_embed';

    // Make the GET request
    $response = wp_remote_get($api_url);

    // Check for errors
    if (is_wp_error($response)) {
        $error_message = $response->get_error_message();
        return esc_html__("Something went wrong:", "blog-post") . " $error_message";
    }

    // Get the body of the response
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response
    $posts = json_decode($body);

    // Check if decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        return esc_html__("Failed to decode JSON:", "blog-post") . json_last_error_msg();
    }

    // Return the posts or process them as needed
    return $posts;
}
