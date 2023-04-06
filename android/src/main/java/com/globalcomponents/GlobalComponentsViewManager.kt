package com.globalcomponents

import android.graphics.Color
import android.view.View
import android.widget.FrameLayout
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class GlobalComponentsViewManager : ViewGroupManager<FrameLayout>() {
  override fun getName() = "GlobalComponentsView"

  override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
    return FrameLayout(reactContext)
  }
}
