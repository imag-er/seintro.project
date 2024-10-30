package com.quoilam.seprj;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;




public class WebAppInterface {
    Context mContext;
    WebView mWebView;
    WebAppInterface(Context c,WebView w) {
        mContext = c;
        mWebView = w;
    }

    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void reload() {
        boolean res = mWebView.post(() -> mWebView.reload());
        showToast(res?"成功":"失败");

    }
}
