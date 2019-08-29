(function() {
    var currentPlayer = "player1";
    var column = $(".column");
    var cursor = $(".cursor");

    $("body").on("mousemove", function(e) {
        cursor.css({
            left: e.pageX - 50 + "px",
            top: e.pageY - 50 + "px"
        });

        if (currentPlayer == "player1") {
            cursor.css("background-color", "#ffa07a");
        } else cursor.css("background-color", "#6495ED");
    });

    column.on("click", function(e) {
        console.log("playerName " + currentPlayer);
        //.find finds children and matches the selector
        var slotsInColumn = $(e.currentTarget).find(".slot");
        //loop through slots to find the one that does not have class player1 or player2
        for (var i = 5; i >= 0; i--) {
            //the slot is empty if it does not have class player1 or 2
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                break; //end the loop. return would end the entire function
            }
        }
        //if a user selects a column when there is no empty slot, nothing should happen, and it's still current players turn
        if (i == -1) {
            return;
        }
        //check for victory
        console.log(i); //console.log row number

        function checkForVictory(slots) {
            var count = 0;
            // console.log(slots);

            for (var i = 0; i < slots.length; i++) {
                //loops tru all rows and columns
                if (slots.eq(i).hasClass(currentPlayer)) {
                    count++;
                    if (count == 4) {
                        // alert("you win!");
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        if (checkForVictory(slotsInColumn)) {
            console.log("you win!");
            setTimeout(function() {
                winMessage();
            }, 200);

            //do victory dance
        } else if (checkForVictory($(".row" + i))) {
            console.log("you win!");
            setTimeout(function() {
                winMessage();
            }, 200);

            //do victory dance
        } else if (checkForDiagonalVictory1($("#board"))) {
            setTimeout(function() {
                winMessage();
            }, 200);
            console.log("you win!");
        } else {
            checkForDiagonalVictory2($("#board"));
        }

        //check diagonal

        switchPlayers();

        function checkForDiagonalVictory1(board) {
            for (var col = 0; col <= board.children().length - 3; col++) {
                for (
                    var row = 0;
                    row <=
                    board
                        .children()
                        .eq(col)
                        .children().length -
                        3;
                    row++
                ) {
                    if (
                        board
                            .children()
                            .eq(row)
                            .children()
                            .eq(col)
                            .hasClass(currentPlayer) &&
                        board
                            .children()
                            .eq(row + 1)
                            .children()
                            .eq(col + 1)
                            .hasClass(currentPlayer) &&
                        board
                            .children()
                            .eq(row + 2)
                            .children()
                            .eq(col + 2)
                            .hasClass(currentPlayer) &&
                        board
                            .children()
                            .eq(row + 3)
                            .children()
                            .eq(col + 3)
                            .hasClass(currentPlayer)
                    ) {
                        return true;
                    }
                }
            }
        }

        function checkForDiagonalVictory2(board) {
            for (var col = 3; col <= board.children().length; col++) {
                for (
                    var row = 0;
                    row <=
                    board
                        .children()
                        .eq(col)
                        .children().length -
                        3;
                    row++
                ) {
                    if (
                        board
                            .children()
                            .eq(col)
                            .children()
                            .eq(row)
                            .hasClass(currentPlayer) &&
                        board
                            .children()
                            .eq(col - 1)
                            .children()
                            .eq(row + 1)
                            .hasClass(currentPlayer) &&
                        board
                            .children()
                            .eq(col - 2)
                            .children()
                            .eq(row + 2)
                            .hasClass(currentPlayer) &&
                        board
                            .children()
                            .eq(col - 3)
                            .children()
                            .eq(row + 3)
                            .hasClass(currentPlayer)
                    ) {
                        console.log("you win!");
                        setTimeout(function() {
                            winMessage();
                        }, 200);
                        return true;
                    }
                }
            }
        }
        function winMessage() {
            $("#modal-dialog").show();

            var winnerName;

            if (currentPlayer == "player2") {
                winnerName = player1Name;
            } else if (currentPlayer == "player1") {
                winnerName = player2Name;
            }

            $("#winner-message").text(winnerName + " wins!");
            $("button").on("click", function() {
                $("#modal-dialog").hide();
                $("#initial-modal-dialog").show();
                // $("#start-game-btn").on("click", function() {
                //     $("#initial-modal-dialog").hide();
                //     player1Name = $("#player-one-name").val();
                //     player2Name = $("#player-two-name").val();
                // });
                setPlayerName();
                clearBoard();
            });
        }

        function clearBoard() {
            for (var i = 0; i <= $(".slot").length; i++) {
                $(".slot")
                    .eq(i)
                    .removeClass("player1");
                $(".slot")
                    .eq(i)
                    .removeClass("player2");
            }
        }
    });
    setPlayerName();
    var player1Name = "player1";
    var player2Name = "player2";

    function setPlayerName() {
        $("#start-game-btn").on("click", function() {
            $("#initial-modal-dialog").hide();
            player1Name = $("#player-one-name").val();
            player2Name = $("#player-two-name").val();
        });
    }
    //placeholder animation
    var showing = true;

    setInterval(function() {
        //showing = !showing;

        if (showing == true) {
            showing = false;
        } else {
            showing = true;
        }

        if (showing == true) {
            $("#player-one-name").attr("placeholder", "_");
            $("#player-two-name").attr("placeholder", "_");
        } else {
            $("#player-one-name").attr("placeholder", "");
            $("#player-two-name").attr("placeholder", "");
        }
    }, 500);

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
})();

//one way check for victory

//second switchPlayers

// function checkForVictory(slots) {
//     var str = "";
//     for (var i = 0; i < slots.length; i++) {
//         if (slots.eq(i).hasClass(currentPlayer)) {
//             str += "w";
//         } else {
//             str += "l";
//         }
//     }
//     if (str.indexOf("www") > -1);
// }

// var d = $("div").eq(0);
// d.length;
// 1;
//
// d = d / add($("div").eq(3));
