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
    <meta name="keywords" content="沙田柚,密柚,梅州金柚，一来顺农业合作社,梅县沙田柚,梅县桃尧沙田柚,金柚之乡,金柚之乡地址" />
    <meta name="description" content="梅州市梅县区桃尧一来顺水果专业合作社，供应优质正宗梅州沙田柚，货源充足，欢迎订购。" />
    <title>一来顺水果专业合作社</title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page">
    <div id="header">
        <div id="logo-wrapper">
            <a href="#home" class="logo">
                一来顺水果专业合作社
            </a>
        </div>

        <div class="menu-wrapper" id="menu-wrapper">
            <ul class="menu">
                <li>
                    <a class="active" href="#home">
                        首页
                    </a>
                </li><!-- clear space
                --><li>
                    <a href="#product">
                        最新供应
                    </a>
                </li><!-- clear space
                --><li>
                    <a href="#concat">
                        联系我们
                    </a>
                </li>
            </ul>
        </div>

    </div>


