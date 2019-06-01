class BackgroundPage {
  constructor() {
    // Properties
    this.captionRequestsInFlight = {}; // TODO - Still need?
    this.netflixCaptionRequestPattern = 'https://*.nflxvideo.net/?o=*&v=*&e=*&t=*';
    this.youtubeCaptionRequestPattern = 'https://www.youtube.com/api/timedtext*';
    this.pendingMessagesForTabId = {} // tabId: [Messages]

    // Binds
    this.onTabUpdated = this.onTabUpdated.bind(this);
    this.onBeforeNetflixCaptionRequest = this.onBeforeNetflixCaptionRequest.bind(this);
    this.onBeforeYouTubeCaptionRequest = this.onBeforeYouTubeCaptionRequest.bind(this);
    this.sendMessageToTabId = this.sendMessageToTabId.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendPendingMessages = this.sendPendingMessages.bind(this);

    // Listeners
    window.chrome.webRequest.onBeforeRequest.addListener(
      this.onBeforeYouTubeCaptionRequest, {
        urls: [this.youtubeCaptionRequestPattern]
      }
    );
    window.chrome.webRequest.onBeforeRequest.addListener(
      this.onBeforeNetflixCaptionRequest, {
        urls: [this.netflixCaptionRequestPattern]
      }
    );
    window.chrome.tabs.onUpdated.addListener(this.onTabUpdated);
  }

  sendPendingMessages(tabId) {
    if (tabId in this.pendingMessagesForTabId) {
      this.pendingMessagesForTabId[tabId].forEach(message => {
        window.chrome.tabs.sendMessage(tabId, message, () => {});
      });
      delete this.pendingMessagesForTabId[tabId];
    }

  }

  sendMessageToTabId(tabId, message) {
    if (!tabId) {
      return null;
    } else if (tabId in this.pendingMessagesForTabId) {
      this.pendingMessagesForTabId[tabId].push(message);
    } else {
      this.pendingMessagesForTabId[tabId] = [message];
    }
  }

  onMessage(message, sender, sendResponse) {
    const tabId = sender.id;
    switch (message.type) {
      case 'get-pending-messages':
      if (tabId) {
        this.sendPendingMessages(tabId);
      }
      break;
    }
  }

  onBeforeNetflixCaptionRequest(details) {
    const tabId = details.tabId;
    if (!(details.url in this.captionRequestsInFlight)) {
      this.captionRequestsInFlight[details.url] = true;
      this.sendMessageToTabId(tabId, {
        type: 'process-caption-request',
        payload: details.url
      });
    }
  }

  onBeforeYouTubeCaptionRequest(details) {
    const tabId = details.tabId;
    if (!(details.url in this.captionRequestsInFlight)) {
      this.captionRequestsInFlight[details.url] = true;
      this.sendMessageToTabId(tabId, {
        type: 'process-caption-request',
        payload: details.url
      });
    }
  }

  onTabUpdated(tabId, changeInfo, tab) {
    if (tabId && changeInfo.url) {
      // Let content scripts know the URL changed
      window.chrome.tabs.sendMessage(tabId, {
        type: 'tab-updated-url'
      }, () => {});
    }
  }
}

window.background = new BackgroundPage();
