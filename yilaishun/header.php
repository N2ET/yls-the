<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page">
    <div class="header">
        <!-- Logo -->
        <div id="logo-wrapper">
            <a href="#home" class="logo">
                <img src="" alt="一来顺果业">
            </a>
        </div>

        <!-- Menu -->
        <div class="menu-wrapper" id="menu-wrapper">
            <ul class="menu">
                <li>
                    <a href="#home">
                        首页
                    </a>
                </li>
                <li>
                    <a href="#gallery">
                        图库
                    </a>
                </li>
                <li>
                    <a href="about">
                        关于我们
                    </a>
                <li>
                <li>
                    <a href="concat">
                        联系我们
                    </a>
                </li>
            </ul>
        </div> <!-- End: Menu -->

        <li class="reservation-btn">
            <a href="#contact">
                联系我们
                <span class="grey"></span>
            </a>
        </li>
    </div>


