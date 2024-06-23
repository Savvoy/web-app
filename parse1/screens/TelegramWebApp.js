import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const TelegramWebApp = () => {
  const webviewRef = useRef(null);

  useEffect(() => {
    const script = `
      (function() {
        var script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        document.head.appendChild(script);
        script.onload = function() {
          // Telegram Web App JS has been loaded, initialize your app here
          if (window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            // Access Telegram Web App methods here
          }
        };
      })();
    `;
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(script);
    }
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ html: '<html><body></body></html>' }}
        javaScriptEnabled
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TelegramWebApp;
