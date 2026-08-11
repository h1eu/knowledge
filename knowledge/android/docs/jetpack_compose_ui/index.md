---
id: android.jetpack_compose.overview
title: Session 09 Overview
summary: Tổng quan Session 09 — Jetpack Compose UI: Remember, State, Side-Effects, Theming, Modifier, Layout, Graphics/Animations và Gesture.
status: draft
difficulty: advanced
depth: overview
estimated_reading_time: 10 phút
tags: [android, overview, session-09, compose, ui]
prerequisites: []
related: []
downstream: []
learning_outcomes:
  - Hiểu các khái niệm nền tảng của Jetpack Compose.
  - Nắm được cách quản lý state và side-effects trong Compose.
  - Biết cách dùng Modifier, theming, animation và gesture.
knowledge_gap: >
  Không nắm rõ mô hình declarative UI của Compose dễ dẫn đến lạm dụng state sai chỗ, gây recomposition thừa và hiệu năng kém.
---

# Session 09: Jetpack Compose UI

## Giới thiệu

Session 09 giới thiệu **Jetpack Compose** — bộ công cụ UI hiện đại dùng mô hình declarative để xây dựng giao diện Android.

## Nội dung Session

- [9.1 Remember and Recomposition](remember_and_recomposition.md)
- **9.2 State and State Hoisting**
  - [9.2.1 MutableState](state/mutable_state.md)
  - [9.2.2 Remember and rememberSaveable](state/remember_saveable.md)
- **9.3 Side-Effects**
  - [9.3.1 LaunchedEffect](side_effects/launched_effect.md)
  - [9.3.2 DisposableEffect](side_effects/disposable_effect.md)
  - [9.3.3 ProduceState](side_effects/produce_state.md)
  - [9.3.4 DerivedStateOf](side_effects/derived_state_of.md)
  - [9.3.5 SnapShotFlow and flowWithSnapshot](side_effects/flow_with_snapshot.md)
- **9.4 Theming**
  - [9.4.1 Material Design Theme (Color, Typography, Shapes)](theming/material_design_theme.md)
  - [9.4.2 Custom Theme (Dimens, Factories, Data)](theming/custom_theme.md)
- **9.5 Modifier**
  - [9.5.1 Modifier Order](modifier/modifier_order.md)
  - [9.5.2 Chaining](modifier/chaining.md)
  - [9.5.3 Composed Modifier](modifier/composed.md)
  - [9.5.4 Lazy Column](modifier/lazy_column.md)
  - [9.5.5 Lazy Row](modifier/lazy_row.md)
  - [9.5.6 Lazy Vertical Grid](modifier/lazy_vertical_grid.md)
  - [9.5.7 Lazy Paging Items](modifier/lazy_paging_items.md)
- [9.6 Layout and View (Text, Image, Layout)](layout_and_view.md)
- **9.7 Graphics and Animations**
  - [9.7.1 Surface and Canvas](graphics_animations/surface_and_canvas.md)
  - [9.7.2 AnimatedVisibility](graphics_animations/animated_visibility.md)
  - [9.7.3 MutableTransitionState](graphics_animations/mutable_transition_state.md)
  - [9.7.4 AnimatedContent](graphics_animations/animated_content.md)
  - [9.7.5 Crossfade](graphics_animations/crossfade.md)
- **9.8 Gesture and Composition Local**
  - [9.8.1 Scrolling](gesture/scrolling.md)
  - [9.8.2 Dragging](gesture/dragging.md)
  - [9.8.3 Swipping](gesture/swipping.md)
  - [9.8.4 Zooming](gesture/zooming.md)

## Học tiếp

Sau Session 09, bạn sẽ tìm hiểu về coding analysis và testing trong Session 10.
