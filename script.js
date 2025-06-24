//jQueryを使用したコード
$(document).ready(function() {
  const cards = $(".card");
  let hasFlippedCard = false;       // めくる動作 最初はめくっていない状態からだからfalse
  let first, second;                // 2回めくるうちの1回目のカード、2回目のカードを定義
  let lockBoard = false;            // 正解したらカードを固定する 最初はfalse

  //カードをひっくり返す
  function flipCard() {
    if (lockBoard) return;
    if (this === first) return;     // 1個目と2個目が同じだったら動かない
    $(this).addClass("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      first = this;
      // 最初に表面の画像（front）を表示
      $(first).find('.front').css('display', 'block');
      $(first).find('.back').css('display', 'none');

      // カードを裏返したときに裏面の画像（back）を表示する
      $(first).find('.front').css('display', 'none');
      $(first).find('.back').css('display', 'block');
      return;
    }

    second = this;
    $(second).find('.front').css('display', 'block');
    $(second).find('.back').css('display', 'none');
    $(second).find('.front').css('display', 'none');
    $(second).find('.back').css('display', 'block');

    checkForMatch();
  }

  // 2つのカードが一致しているか判断
  function checkForMatch() {
    let isMatch = $(first).data("name") === $(second).data("name");   // 同じdata-nameなら動かなくする
    isMatch ? disableCards() : unflipCards();                         // 違ったらもとに戻す
  }

  // 一致したものは動かなくさせる
  function disableCards() {
    $(first).off("click", flipCard);
    $(second).off("click", flipCard);
    resetBoard();
  }

  // 一致しなかったカードを元に戻す
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      $(first).removeClass("flip");
      $(second).removeClass("flip");

      // カードを裏返したときに裏面の画像（back）を表示する
      $(first).find('.front').css('display', 'block');
      $(first).find('.back').css('display', 'none');
      $(second).find('.front').css('display', 'block');
      $(second).find('.back').css('display', 'none');
      resetBoard();
    }, 1500);
  }

  // ターンをリセット
  function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    first = null;
    second = null;
  }

  // 更新したら自動的にシャッフル
  (function shuffle() {
    cards.each(function() {
      let newPosition = Math.floor(Math.random() * 12);
      $(this).css("order", newPosition);
    });
  })();

  // ゲーム開始時にカードの表面の画像を表示
  cards.each(function() {
    $(this).find('.front').css('display', 'block');
    $(this).find('.back').css('display', 'none');
  });

  // クリックするとめくる機能
  cards.on("click", flipCard);

  // 全てのカードが正解した場合におめでとう！メッセージを表示
  let matchedPairs = 0;
  if (isMatch) {
    matchedPairs++; // 正解したカードのペア数
    if (matchedPairs === 6) {
      displayMessage();
    }
  }
  // おめでとう！メッセージを表示
  function displayMessage() {
    alert('おめでとう！全てのカードがマッチしました！');
  }
});

//リセットボタンをクリックしたときの処理
$('#reset').on('click', function() {
  // カードのクラスを削除して元の状態に戻す
  $('.card').removeClass('flip');
  $('.card').find('.front').css('display', 'block');
  $('.card').find('.back').css('display', 'none');

  // カードをクリックできるようにする
  $('.card').on('click', flipCard);

  resetBoard();
});



