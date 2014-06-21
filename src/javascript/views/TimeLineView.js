define(['text!templates/TimelineViewTemplate.html', 'jquery'], function(TimelineViewTemplate, $) {
    var _timelineModel,
        _parentElement,
        _templatedRendered = false,
        // no need for a templating engine here as we're just replacing two values
        _updateTemplate = function() {
            if(_templatedRendered) {
                $('#timeline-top-pane-text').text(_getTopPaneText());
                $('#timeline-bottom-pane-text').text(_getBottomPaneText());
                $('#time-since-first-play').text(_timelineModel.timeSinceFirstPlay);
                $('#time-since-last-pause').text(_timelineModel.timeSinceLastPause);
                $('#time-since-last-resume').text(_timelineModel.timeSinceLastResume);
                $('#time-since-page-load').text(_timelineModel.timeSincePageLoad);
                $('#time-this-event-should-show').text(_timelineModel.timeThisEventShouldShow);
                $('#time-since-event-started').text(_timelineModel.timeSinceEventStarted);
                $('#howLongAnimationWasPaused').text(_timelineModel.howLongAnimationWasPaused);

            } else {
                var updatedTemplate = TimelineViewTemplate.replace('%%TOP_PANE_TEXT%%', _getTopPaneText())
                    .replace('%%BOTTOM_PANE_TEXT%%', _getBottomPaneText());

                _parentElement.append(updatedTemplate);
                _wireBottomPaneClick();
                _templatedRendered = true;
            }
        },
        _getBottomPaneText = function() {
            switch(_timelineModel.getPlayerState()) {
                case _timelineModel.NOT_STARTED:
                case _timelineModel.PAUSED: {
                    return 'play';
                }
                case _timelineModel.PLAYING: {
                    return 'pause';
                }
                case _timelineModel.COMPLETED: {
                    return 'restart';
                }
            }
        },
        _getTopPaneText = function() {
            switch(_timelineModel.getPlayerState()) {
                case _timelineModel.PLAYING:
                case _timelineModel.COMPLETED: {
                    return 'at age ' + _timelineModel.getAgeForCurrentEvent() + ', ' + _timelineModel.getFirstName() + ' ' +
                        _timelineModel.getActivityForAge(_timelineModel.getAgeForCurrentEvent());
                }
                case _timelineModel.NOT_STARTED: {
                    return _timelineModel.getFullName();
                }
            }
        },
        _showclickedAnimation = function() {
            $('#timeline-bottom-pane').toggleClass('timeline-bottom-pane-unclicked');
            $('#timeline-bottom-pane').addClass('timeline-bottom-pane-clicked');

            setTimeout(function() {
                $('#timeline-bottom-pane').removeClass('timeline-bottom-pane-clicked');
                $('#timeline-bottom-pane').addClass('timeline-bottom-pane-unclicked');
            }, 100);
        },
        _wireBottomPaneClick = function() {
            $('#timeline-bottom-pane').click(function () {
                if(_timelineModel.getPlayerState() === _timelineModel.NOT_STARTED ||
                    _timelineModel.getPlayerState() === _timelineModel.COMPLETED ||
                    _timelineModel.getPlayerState() === _timelineModel.PAUSED) {
                    _timelineModel.changePlayerState(_timelineModel.PLAYING);
                } else if(_timelineModel.getPlayerState() === _timelineModel.PLAYING) {
                    _timelineModel.changePlayerState(_timelineModel.PAUSED);
                }
                _showclickedAnimation();
            });
        },
        _handleModelEvents = function(eventData) {
            _updateTemplate();
        },
        TimelineView = function (parentElement, timelineModel) {
            _timelineModel = timelineModel;
            _parentElement = parentElement;
            _timelineModel.handleModelEvents(_handleModelEvents);
        };

    TimelineView.prototype.render = function() {
        _updateTemplate();
    }

    return TimelineView;
});
