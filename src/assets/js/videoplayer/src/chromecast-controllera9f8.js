const PLAYER_STATE = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED',
    ERROR: 'ERROR'
};

const CastPlayer = function () {
    this.data = null;
};

CastPlayer.prototype.initializeCastApi = function (player, data) {
    this.localPlayer = player;
    this.stateBeforeCasting = {
        volume: player.volume(),
        muted: player.muted()
    };
    this.data = data;
    this.castInstance = cast.framework.CastContext.getInstance();
    this.castInstance.setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    this.remotePlayer = new cast.framework.RemotePlayer();
    this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer);
    this.remotePlayerController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
        this.switchPlayer.bind(this)
    );
    this.setLocalPlayerWatchers();
    this.setRemotePlayerWatchers();
};

/*
 * PlayerHandler and setup functions
 */
CastPlayer.prototype.switchPlayer = function () {
    if (this.remotePlayer.isConnected) {
        this.stateBeforeCasting.volume = this.localPlayer.volume();
        this.stateBeforeCasting.muted = this.localPlayer.muted();
        this.setSrcFromLocalPlayer();
    } else {
        this.localPlayer.removeClass('casting-video');
        this.localPlayer.volume(this.stateBeforeCasting.volume);
        this.localPlayer.muted(this.stateBeforeCasting.muted);
    }
};

CastPlayer.prototype.generateMediaInfo = function (byPassAd) {
    const currentMediaURL = this.localPlayer.src();
    const contentType = "video/mp4";
    const mediaInfo = new chrome.cast.media.MediaInfo(currentMediaURL, contentType);
    if (this.data.preroll && !this.localPlayer.hasAdBlock && !byPassAd) {
        const breakID = this.genID();
        const adSrc = this.data.preroll.replace(".stage1", "");
        const breakClip = new chrome.cast.media.Break(breakID);
        breakClip.contentId = adSrc;
        breakClip.contentType = contentType;
        breakClip.whenSkippable = parseInt(this.data.prerollStop, 10);
        breakClip.clickThroughUrl = this.data.prerollLink;
        mediaInfo.breakClips = [breakClip];
        const adBreak = new chrome.cast.media.Break(this.genID(), [breakID], 0);
        mediaInfo.breaks = [adBreak];
    }
    return mediaInfo;
}

CastPlayer.prototype.setSrcFromLocalPlayer = function () {
    const localPlayerTime = this.localPlayer.currentTime();
    const castInstance = this.castInstance;
    const request = new chrome.cast.media.LoadRequest(this.generateMediaInfo.call(this, localPlayerTime > 0));

    castInstance.getCurrentSession().loadMedia(request).then(function () {
        this.remotePlayer.currentTime = localPlayerTime;
        this.remotePlayerController.seek();
        this.localPlayer.addClass('casting-video');
        this.localPlayer.controlBar.show();
        this.localPlayer.volume(0);
        this.remotePlayer.volumeLevel = 1;
        this.remotePlayerController.setVolumeLevel();
    }.bind(this), function (e) {
        console.log("error : ", e);
    });
}

CastPlayer.prototype.setRemotePlayerWatchers = function () {
    this.remotePlayerController.addEventListener(cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED, function (event) {
        switch (event.value) {
            case "PAUSED":
                this.localPlayer.pause();
                break;
            case "PLAYING":
                this.localPlayer.play();
                break;
            default:
                break;
        }

    }.bind(this))
}

CastPlayer.prototype.setLocalPlayerWatchers = function () {

    this.localPlayer.on("seeked", this.syncRemoteSeekBar.bind(this));
    this.localPlayer.on("pause", this.syncRemotePause.bind(this));
    this.localPlayer.on("play", this.syncRemotePlay.bind(this));
    this.localPlayer.on("adplaying__", function () {
        if (this.remotePlayer && this.remotePlayer.mediaInfo && this.remotePlayer.mediaInfo.contentId) {
            if (this.localPlayer.src() !== this.remotePlayer.mediaInfo.contentId) {
                const adSrc = this.localPlayer.src();
                this.localPlayer.removeClass('casting-video');

                this.remotePlayer.mediaInfo.breaks = [new chrome.cast.media.Break(id, [adSrc], [0])];
            }
        }
    }.bind(this));
    this.localPlayer.one('adquitted', function () {
        this.remotePlayerController.skipAd();
    }.bind(this));
    this.localPlayer.on('loadeddata', this.syncRemoteSrc.bind(this))
    this.localPlayer.on("durationchanged", function () {
        this.remotePlayerController.playOrPause();
    }.bind(this));
}


CastPlayer.prototype.syncRemoteSound = function () {
    if (this.localPlayer.muted() !== this.remotePlayer.isMuted) {
        this.remotePlayerController.muteOrUnmute();
    } else {
        this.remotePlayer.volumeLevel = this.localPlayer.volume();
        this.remotePlayerController.setVolumeLevel();
    }
}

CastPlayer.prototype.syncRemotePlay = function () {
    if (this.remotePlayer.isPaused) {
        this.remotePlayerController.playOrPause();
    }
}

CastPlayer.prototype.syncRemotePause = function () {
    if (!this.remotePlayer.isPaused) {
        this.remotePlayerController.playOrPause();
    }
}
CastPlayer.prototype.syncRemoteSeekBar = function () {
    this.remotePlayer.currentTime = this.localPlayer.currentTime();
    this.remotePlayerController.seek();
}
CastPlayer.prototype.syncRemoteSrc = function () {
    if (this.remotePlayer && this.remotePlayer.mediaInfo && this.remotePlayer.mediaInfo.contentId) {
        if (this.localPlayer.src() !== this.remotePlayer.mediaInfo.contentId) {
            this.setSrcFromLocalPlayer();
        }
    }
}

CastPlayer.prototype.genID = function () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

CastPlayer.prototype.initReceiverWatchers = function () {
    let playerManager;
    try {
        playerManager = cast.framework.CastReceiverContext.getInstance().getPlayerManager();
    } catch (e) {
        console.error("this method need the cast receiver framework to be instantiated");
    }

    playerManager.addEventListener(
        cast.framework.events.EventType.ERROR, (event) => {
            // Write your own event handling code, for example
            // using the event.mediaStatus value
        });

    playerManager.addEventListener(
        cast.framework.events.EventType.MEDIA_STATUS, (event) => {
            // Write your own event handling code, for example
            // using the event.mediaStatus value
        });

    playerManager.addEventListener(cast.framework.events.EventType.PLAYER_LOAD_COMPLETE, () => {
        log('[mediacast:events:PLAYER_LOAD_COMPLETE');
        console.log(playerManager.getStats());
        console.log(playerManager.getMediaInformation());
    });

    playerManager.addEventListener(cast.framework.events.EventType.BITRATE_CHANGED, (event) => {
        log('[mediacast:events:BITRATE_CHANGED - ' + event.totalBitrate);
        stats.bitrate = event.totalBitrate;
        console.log(playerManager.getStats());
    });

    playerManager.addEventListener(cast.framework.events.EventType.PLAYING, (event) => {
        log('[mediacast:events:PLAYING - ', JSON.stringify(event));
    });

    playerManager.addEventListener(cast.framework.events.EventType.PAUSE, (event) => {
        log('[mediacast:events:PAUSE - ', JSON.stringify(event));
    });

    playerManager.addEventListener(cast.framework.events.EventType.SEEKING, (event) => {
        log('[mediacast:events:SEEKING - ', JSON.stringify(event));
    });

    playerManager.addEventListener(cast.framework.events.EventType.BUFFERING, (event) => {
        log('[mediacast:events:BUFFERING - ', JSON.stringify(event));
    });

    playerManager.addEventListener(cast.framework.events.EventType.TIME_UPDATE, (event) => {
        // log('[mediacast:events:TIME_UPDATE - ', JSON.stringify(event));
        stats.currentMediaTime = event.currentMediaTime;
    });

    playerManager.addEventListener(cast.framework.events.EventType.MEDIA_STATUS, (event) => {
        log('[mediacast:events:MEDIA_STATUS - ', JSON.stringify(event));
        stats.state = event.mediaStatus.playerState;
    });
}