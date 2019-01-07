var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        var newFriend = req.body;
        console.log(newFriend);
        var bestMatch = {};

        for (var i = 0; i < newFriend.scores.length; i++) {
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }

        var bestMatchIndex = 0;
        var bestMatchDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for (var index = 0; index < friends[i].scores.length; index++) {
                var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
                totalDifference += differenceOneScore;
            }

            if (totalDifference < bestMatchDifference) {
                bestMatchIndex = i;
                bestMatchDifference = totalDifference;
            }
        }

        bestMatch = friends[bestMatchIndex];

        friends.push(newFriend);

        res.json(bestMatch);
    });

};