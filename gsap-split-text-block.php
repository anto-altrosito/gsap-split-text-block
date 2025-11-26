<?php

/**
 * Plugin Name: GSAP Split Text Block
 * Description: Blocco wrapper per animazioni split text con GSAP e Split-Type
 * Version: 1.0.0
 * Author: Il tuo nome
 * Text Domain: gsap-split-block
 */

if (!defined('ABSPATH')) exit;

class GSAP_Split_Text_Block
{

    public function __construct()
    {
        add_action('init', [$this, 'register_block']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
    }

    public function register_block()
    {
        register_block_type(__DIR__ . '/build');
    }

    public function enqueue_editor_assets()
    {
        $asset_file = plugin_dir_path(__FILE__) . 'build/index.asset.php';

        if (!file_exists($asset_file)) {
            return;
        }

        $asset = include $asset_file;

        wp_enqueue_script(
            'gsap-split-block-editor',
            plugins_url('build/index.js', __FILE__),
            $asset['dependencies'],
            $asset['version']
        );

        // Il CSS viene caricato automaticamente da index.js tramite webpack
    }

    public function enqueue_frontend_assets()
    {
        if (!has_block('gsap-split/animated-content')) {
            return;
        }

        // GSAP
        wp_enqueue_script(
            'gsap',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
            [],
            '3.12.5',
            true
        );

        // ScrollTrigger
        wp_enqueue_script(
            'gsap-scrolltrigger',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
            ['gsap'],
            '3.12.5',
            true
        );

        // Split-Type
        wp_enqueue_script(
            'split-type',
            'https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js',
            [],
            '0.3.4',
            true
        );

        // Script frontend (il CSS style.css viene incluso automaticamente da webpack)
        $frontend_js = plugin_dir_path(__FILE__) . 'build/frontend.js';
        if (file_exists($frontend_js)) {
            wp_enqueue_script(
                'gsap-split-block-frontend',
                plugins_url('build/frontend.js', __FILE__),
                ['gsap', 'gsap-scrolltrigger', 'split-type'],
                filemtime($frontend_js),
                true
            );
        }
    }
}

new GSAP_Split_Text_Block();
