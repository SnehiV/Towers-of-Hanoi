function HanoiView(game, rootEl) {
  this.game = game;
  this.rootEl = rootEl;
  this.liTowers = [];
  this.fromTower = null;
  this.setupTowers();
  this.render();
  this.clickTower();
}

HanoiView.prototype.setupTowers = function() {
  for (var i = 0; i < 3; i++) {
    const $tower = $('<ul></ul>');
    $tower.data('id', i);
    let liTower = [];
    for (var j = 0; j < 3; j++) {
      const $block = $('<li></li>');
      $tower.append($block);
      liTower.push($block);
    }
    this.liTowers.push(liTower);
    this.rootEl.append($tower);
  }
};

HanoiView.prototype.render = function() {
  for (var i = 0; i < this.liTowers.length; i++) {
    let gametower = this.game.towers[i];
    let liTower = this.liTowers[i];

    for (var j = 0; j < liTower.length; j++) {
      const liIdx = liTower.length - j - 1;
      let discValue = gametower[j];
      liTower[liIdx].removeClass();

      if (discValue) {
        liTower[liIdx].addClass('disc');
        liTower[liIdx].addClass(`disc-${discValue}`);
      }
    }
  }
};

HanoiView.prototype.clickTower = function() {
  const $towers = $('ul');
  $towers.on("click", event => {
    let $tower = $(event.currentTarget);
    if (this.fromTower !== null) {
      this.playMove($tower);
    } else {
      this.fromTower = $tower;
      this.fromTower.addClass('fromTower');
    }
    this.render();
    this.checkWin();
  });
};

HanoiView.prototype.checkWin = function() {
  if (this.game.isWon()) {
    const $grid = $('.hanoi');
    const $winMessage = $('<strong>Congrats!</strong>');
    $grid.append($winMessage);
  }
};

HanoiView.prototype.playMove = function(toTower) {
  let turn = this.game.move(this.fromTower.data('id'), toTower.data('id'));
  this.fromTower.removeClass('fromTower');
  this.fromTower = null;

  if (!turn) {
    alert("Invalid move");
  }
};

module.exports = HanoiView;
