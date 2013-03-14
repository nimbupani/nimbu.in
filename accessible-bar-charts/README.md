BAR CHARTS IN HTML

1. The full script is available un-minified in js/script.js The app uses js/script-min.js

2. The app is limited to producing 10 bars per chart. I think that is more than sufficient for simple bar charts.

3. It was initially based on table of data which would have been more semantic, but unfortunately IE9 (even Preview 4) does not render tables if styled using display: block or display: inline-block (bug report here: http://is.gd/e6TeP ). So, I have converted them to what I think are the next best alternative: name-value pairs. The original, using tables, is still available here: http://dl.dropbox.com/u/952/10k/index.html

4.  The chart auto-updates whenever the bar values are changed. The largest value occupies the full width of the chart.
