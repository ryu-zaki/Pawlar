package com.pawlar.app;

import com.getcapacitor.BridgeActivity;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        registerPlugin(SocialLoginPlugin.class);
    }
}
