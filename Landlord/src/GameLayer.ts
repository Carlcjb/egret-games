enum CARD_TYPE
{
    CARD_TYPE_SPADE = 1, // 黑桃
    CARD_TYPE_HEARTS,    // 红心
    CARD_TYPE_CLUB,      // 梅花
    CARD_TYPE_DIAMOND,   // 方块
    CARD_TYPE_JOKER      // 大小王
}

class Card {
    public type:CARD_TYPE;
    public card_number:number;

    public player_index:number;
    public is_selected:boolean;

    public front_img_name:string;

    public base_layer:egret.DisplayObjectContainer = null;
    public front_img:egret.Bitmap = null;
    public back_img:egret.Bitmap = null;
}

class Player {
    public name:string;
    public money:number;
}

class GameLayer extends egret.DisplayObjectContainer {

    public guiLayer:egret.gui.UIStage;
    public main_director:Main;
    public main_view:UIMainView;

    private background:egret.Bitmap = null;

    private CARD_START_POS_X:number = 0;
    private CARD_START_POS_Y:number = 0;

    public all_cards = [];
    public player_list = [];
    private card_index_bottom:number = 0;
    private card_index_top:number = 0;

    public constructor() {
        super();
    }

    public showOnMainLayer(main_director:Main):void {
        this.main_director = main_director;

        // Add self layer to stage
        this.main_director.stage.addChildAt(this, 0);

        // Add UIStage.
        this.guiLayer = new egret.gui.UIStage();
        this.main_director.stage.addChildAt(this.guiLayer, 1);

        this.main_view = new UIMainView();
        this.main_view.show(this, main_director);

        this.initGameLayer();

        this.startNewGame();
    }
    public removeFromMainLayer():void {
        /*if (this.logic_timer != null) {
            this.logic_timer.stop();
            this.logic_timer = null;
        }*/

        this.main_director.stage.removeChild(this);
        this.main_director.stage.removeChild(this.guiLayer);
    }

    private initGameLayer() {
        this.background = new egret.Bitmap()
        this.background.texture = RES.getRes("desk_bg_jpg");
        this.addChild(this.background);
        this.background.x = 0;
        this.background.y = 0;

        this.CARD_START_POS_X = 60;
        this.CARD_START_POS_Y = 60;

        this.initAllPlayers();
        this.initAllCards();
    }
    private initAllPlayers() {
        var player1 = new Player();
        player1.name = "player1";
        player1.money = 100;
        this.player_list.push(player1);

        var player2 = new Player();
        player2.name = "player2";
        player2.money = 100;
        this.player_list.push(player2);

        var player3 = new Player();
        player3.name = "player3";
        player3.money = 100;
        this.player_list.push(player3);
    }

    private initOneCard(type:CARD_TYPE, card_number:number) {
        var card = new Card();

        card.type = type;
        card.card_number = card_number;
        if (type == CARD_TYPE.CARD_TYPE_JOKER) {
            card.card_number = card_number + 13;
        }

        card.base_layer = new egret.DisplayObjectContainer();
        card.base_layer.anchorX = 0.5;
        card.base_layer.anchorY = 0.5;
        card.base_layer.width = 80;
        card.base_layer.height = 105;
        card.base_layer.x = this.CARD_START_POS_X;
        card.base_layer.y = this.CARD_START_POS_Y;
        this.addChild(card.base_layer);

        card.back_img = new egret.Bitmap();
        card.back_img.texture = RES.getRes("card_back_1_png");
        card.back_img.x = 0;
        card.back_img.y = 0;
        card.base_layer.addChild(card.back_img);

        card.player_index = -1;
        card.is_selected = false;

        var front_img_name:string = "";
        switch (type)
        {
            case CARD_TYPE.CARD_TYPE_SPADE:
                front_img_name = "spade";
                break;

            case CARD_TYPE.CARD_TYPE_HEARTS:
                front_img_name = "hearts";
                break;

            case CARD_TYPE.CARD_TYPE_CLUB:
                front_img_name = "club";
                break;

            case CARD_TYPE.CARD_TYPE_DIAMOND:
                front_img_name = "diamond";
                break;

            case CARD_TYPE.CARD_TYPE_JOKER:
                front_img_name = "joker";
                break;

            default:
                console.log("====== error card type: " + type);
                return;
        }
        front_img_name = front_img_name + "_" + card_number + "_png"

        card.front_img_name = front_img_name;

        card.front_img = new egret.Bitmap();
        card.front_img.texture = RES.getRes(front_img_name);
        card.front_img.x = 0;
        card.front_img.y = 0;
        card.front_img.touchEnabled = true;
        card.base_layer.addChild(card.front_img);
        card.front_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);

        this.all_cards.push(card);
    }
    private initAllCards() {
        this.all_cards = [];

        for (var i = 1; i < 14; i++) {
            this.initOneCard(CARD_TYPE.CARD_TYPE_SPADE, i);
        }

        for (var i = 1; i < 14; i++) {
            this.initOneCard(CARD_TYPE.CARD_TYPE_HEARTS, i);
        }

        for (var i = 1; i < 14; i++) {
            this.initOneCard(CARD_TYPE.CARD_TYPE_CLUB, i);
        }

        for (var i = 1; i < 14; i++) {
            this.initOneCard(CARD_TYPE.CARD_TYPE_DIAMOND, i);
        }

        for (var i = 1; i < 3; i++) {
            this.initOneCard(CARD_TYPE.CARD_TYPE_JOKER, i);
        }

        this.card_index_bottom = this.getChildIndex(this.all_cards[0].base_layer);
        this.card_index_top = this.getChildIndex(this.all_cards[53].base_layer);
    }

    public startNewGame() {
        this.resetAllCards();
        this.resetGameDatas();
        this.shuffleCards();

        this.dealCards();
    }

    private resetAllCards() {
        this.main_view.hideLastThreeCard();

        for (var i = 0; i < this.all_cards.length; i++) {
            var card = this.all_cards[i];

            card.base_layer.x = this.CARD_START_POS_X;
            card.base_layer.y = this.CARD_START_POS_Y;
            card.base_layer.visible = true;

            card.back_img.visible = true;
            card.front_img.visible = false;

            card.player_index = -1;
            card.is_selected = false;
        }
    }

    public landlord_player_index:number = -1;
    public first_call_player_index:number = -1;
    public current_call_player_index:number = 0;
    public base_money:number = 0;
    public money_times:number = 1;
    public player_play_times_list = [];

    public current_play_player_index:number = 0;
    public player_pass_times = 0;
    public current_player_select_cards_sum = 0;
    public last_play_cards = [];

    private resetGameDatas() {
        this.player_cards_list = [[], [], []];
        this.player_play_times_list = [0, 0, 0];

        this.first_call_player_index++;
        this.first_call_player_index = (this.first_call_player_index) % 3;
        this.current_call_player_index = this.first_call_player_index;
        
        this.current_play_player_index = -1;
        this.player_pass_times = 0;
        this.current_player_select_cards_sum = 0;
        this.last_play_cards = []

        this.landlord_player_index = -1;

        this.base_money = 0;
        this.money_times = 1;
    }

    private shuffleCards() {
        var cards_len = this.all_cards.length;
        for (var i = 0; i < cards_len; i++) {
            var n = this.randInt(0, cards_len-1);
            var card = this.all_cards[i];
            this.all_cards[i] = this.all_cards[n];
            this.all_cards[n] = card;
        }

        for (var i = 0; i < cards_len; i++) {
            this.setChildIndex(this.all_cards[i].base_layer, this.card_index_bottom+i);
        }
    }

    private randInt(a:number, b:number):number {
        var n = Math.floor(b-a)
        return Math.floor(a + Math.random() * ( n + 1));
    }

    public deal_cards_timer:egret.Timer;
    public deal_card_index:number;
    public DEAL_ONE_CARD_TIME:number = 200;

    public CARD_SPAN_DIS = 25;
    public player_cards_start_pos = [[150, 200], [150, 350], [150, 520]];
    private player_cards_list = [];

    private dealCards() {
        this.deal_card_index = 0;
        
        this.dealOneCard();
    }

    private dealOneCard() {
        this.deal_card_index++;

        if (this.deal_card_index <= this.all_cards.length - 3) {
            // Deal next card
            var player_index = (this.deal_card_index - 1) % 3;
            var card = this.all_cards[this.all_cards.length - this.deal_card_index];
            card.player_index = player_index;

            var show_card = function(card) {
                card.back_img.visible = false;
                card.front_img.visible = true;
            }
            this.setChildIndex(card.base_layer, this.card_index_top);
            var pos_x = this.player_cards_list[player_index].length * this.CARD_SPAN_DIS + this.player_cards_start_pos[player_index][0];
            var pos_y = this.player_cards_start_pos[player_index][1];
            var tw = egret.Tween.get(card.base_layer);
            tw.to({x:pos_x, y:pos_y}, this.DEAL_ONE_CARD_TIME, egret.Ease.sineInOut).call(show_card, this, [card]);

            this.player_cards_list[player_index].push(card);

            this.deal_cards_timer = new egret.Timer(this.DEAL_ONE_CARD_TIME, 1);
            this.deal_cards_timer.addEventListener(egret.TimerEvent.TIMER, this.dealOneCard, this);
            this.deal_cards_timer.start()
        }
        else {
            // Finish dealing cards
            this.finishDealCards();
        }
    }

    // card1 > card2 return true, else false.
    private compare_single_card(card1, card2) {
        var card_value1 = card1.card_number;
        var card_value2 = card2.card_number;

        if (card_value1 == 1) {
            card_value1 += 50;
        }
        else if (card_value1 == 2) {
            card_value1 += 60;
        }

        if (card_value2 == 1) {
            card_value2 += 50;
        }
        else if (card_value2 == 2) {
            card_value2 += 60;
        }

        if (card1.type == CARD_TYPE.CARD_TYPE_JOKER) {
            card_value1 += 100;
        }
        if (card2.type == CARD_TYPE.CARD_TYPE_JOKER) {
            card_value2 += 100;
        }

        if (card_value1 > card_value2) {
            return true;
        }
        else if (card_value1 == card_value2) {
            return card1.type < card2.type;
        }

        return false;
    }
    private swapTwoCards(card1, card2) {
        var card1_pos_x = card1.base_layer.x;
        var card1_pos_y = card1.base_layer.y;
        var card1_zorder = this.getChildIndex(card1.base_layer);
        var card2_zorder = this.getChildIndex(card2.base_layer);

        card1.base_layer.x = card2.base_layer.x;
        card1.base_layer.y = card2.base_layer.y;
        this.setChildIndex(card1.base_layer, card2_zorder);

        card2.base_layer.x = card1_pos_x;
        card2.base_layer.y = card1_pos_y;
        this.setChildIndex(card2.base_layer, card1_zorder);
    }
    private sortCards(cards) {
        // Bubble sort
        var card_len = cards.length;
        for (var i = 0; i < card_len; i++) {
            var any_move = false;
            for (var j = 0; j < card_len - i - 1; j++) {
                if (this.compare_single_card(cards[j], cards[j+1]) == false) {
                    this.swapTwoCards(cards[j], cards[j+1]);

                    var tmp_card = cards[j];
                    cards[j] = cards[j+1];
                    cards[j+1] = tmp_card;

                    any_move = true;
                }
            }

            if (any_move == false) {
                break;
            }
        }
    }
    private sortAllPlayerCards() {
        for (var i = 0; i < 3; i++) {
            this.sortCards(this.player_cards_list[i]);
        }
    }

    private finishDealCards() {
        this.sortAllPlayerCards();

        this.main_view.showNextPlayerCallBtn(this.current_call_player_index);
    }

    public playerCallLandlord(player_index:number, call_base_money:number) {
        if (call_base_money > 0) {
            this.base_money = call_base_money;
            this.landlord_player_index = player_index;
        }

        this.current_call_player_index++;
        this.current_call_player_index = this.current_call_player_index % 3;
        if (this.current_call_player_index == this.first_call_player_index
                || this.base_money == 3) {
            this.finishCallLandlord();
        }
        else {
            this.main_view.showNextPlayerCallBtn(this.current_call_player_index);
        }
    }

    public finishCallLandlord() {
        this.main_view.hideAllCallButtons();
        
        if (this.landlord_player_index < 0) {
            // No player call
            this.startNewGame();
            return;
        }

        this.main_view.showLandLordIcon();
        this.addLastCardsToLandlord();
    }

    public addLastCardsToLandlord() {
        // Add cards to landlord
        var card = this.all_cards[2];
        card.back_img.visible = false;
        card.front_img.visible = true;
        card.player_index = this.landlord_player_index;
        this.setChildIndex(card.base_layer, this.card_index_top);
        card.base_layer.x = this.player_cards_list[this.landlord_player_index].length * this.CARD_SPAN_DIS + this.player_cards_start_pos[this.landlord_player_index][0];
        card.base_layer.y = this.player_cards_start_pos[this.landlord_player_index][1];
        this.player_cards_list[this.landlord_player_index].push(card);

        card = this.all_cards[1];
        card.back_img.visible = false;
        card.front_img.visible = true;
        card.player_index = this.landlord_player_index;
        this.setChildIndex(card.base_layer, this.card_index_top);
        card.base_layer.x = this.player_cards_list[this.landlord_player_index].length * this.CARD_SPAN_DIS + this.player_cards_start_pos[this.landlord_player_index][0];
        card.base_layer.y = this.player_cards_start_pos[this.landlord_player_index][1];
        this.player_cards_list[this.landlord_player_index].push(card);

        card = this.all_cards[0];
        card.back_img.visible = false;
        card.front_img.visible = true;
        card.player_index = this.landlord_player_index;
        this.setChildIndex(card.base_layer, this.card_index_top);
        card.base_layer.x = this.player_cards_list[this.landlord_player_index].length * this.CARD_SPAN_DIS + this.player_cards_start_pos[this.landlord_player_index][0];
        card.base_layer.y = this.player_cards_start_pos[this.landlord_player_index][1];
        this.player_cards_list[this.landlord_player_index].push(card);

        this.sortCards(this.player_cards_list[this.landlord_player_index]);
        this.startLastThreeCardAnim();
    }

    private startLastThreeCardAnim() {
        var end_pos_y = this.all_cards[0].base_layer.y;
        var offset = 50;
        var anim_time = 500;

        var card_layer_1 = this.all_cards[0].base_layer;
        card_layer_1.y -= offset;
        var tw1 = egret.Tween.get(card_layer_1);
        tw1.to({y:end_pos_y}, anim_time, egret.Ease.sineInOut);

        var card_layer_2 = this.all_cards[1].base_layer;
        card_layer_2.y -= offset;
        var tw2 = egret.Tween.get(card_layer_2);
        tw2.to({y:end_pos_y}, anim_time, egret.Ease.sineInOut);

        var card_layer_3 = this.all_cards[2].base_layer;
        card_layer_3.y -= offset;
        var tw3 = egret.Tween.get(card_layer_3);
        tw3.to({y:end_pos_y}, anim_time, egret.Ease.sineInOut).call(this.endLastThreeCardAnim, this);
    }
    private endLastThreeCardAnim() {
        this.current_play_player_index = this.landlord_player_index;
        this.main_view.showLastThreeCard();

        this.main_view.showNextPlayerPlayBtns(this.current_play_player_index);
    }

    public currentPlayerCanPass() {
        if (this.last_play_cards.length <= 0) {
            return false;
        }

        return true;
    }

    public deselectCurrentPlayerAllCards() {
        var current_cards_list = this.player_cards_list[this.current_play_player_index];
        for (var i = 0; i < current_cards_list.length; i++) {
            var card = current_cards_list[i];
            this.deselectCard(card);
        }
    }

    public hideLastPlayCards() {
        for (var i = 0; i < this.last_play_cards.length; i++) {
            var card = this.last_play_cards[i];
            card.base_layer.visible = false;
        }
    }

    public playerPassCard(player_index:number) {
        if (player_index != this.current_play_player_index) {
            return;
        }

        this.deselectCurrentPlayerAllCards();
        this.current_player_select_cards_sum = 0;

        this.player_pass_times++;
        if (this.player_pass_times == 2) {
            this.player_pass_times = 0;

            this.hideLastPlayCards();
            this.last_play_cards = [];
        }

        this.current_play_player_index++;
        this.current_play_player_index = this.current_play_player_index % 3;

        this.main_view.showNextPlayerPlayBtns(this.current_play_player_index);
    }

    public isCurrentSelectCardsLegal() {
        var selected_cards_list = [];
        var current_cards_list = this.player_cards_list[this.current_play_player_index];
        for (var i = 0; i < current_cards_list.length; i++) {
            var card = current_cards_list[i];
            if (card.is_selected) {
                selected_cards_list.push(card);
            }
        }

        if (this.last_play_cards.length <= 0) {
            var cards_type = Logic.GetCardsType(selected_cards_list);
            if (cards_type == PLAY_CARDS_TYPE.CT_ERROR) {
                return false;
            }

            if (cards_type == PLAY_CARDS_TYPE.CT_MISSILE_CARD 
                    || cards_type == PLAY_CARDS_TYPE.CT_BOMB_CARD) {
                this.money_times *= 2;
            }

            return true;
        }
        else {
            var can_play = Logic.CompareCard(this.last_play_cards, selected_cards_list);
            if (can_play) {
                if (Logic.current_cards_type == PLAY_CARDS_TYPE.CT_MISSILE_CARD 
                        || Logic.current_cards_type == PLAY_CARDS_TYPE.CT_BOMB_CARD) {
                    this.money_times *= 2;
                }
            }
            return can_play;
        }

        return false;;
    }

    public playerPlayCards(player_index:number) {
        if (player_index != this.current_play_player_index) {
            return;
        }

        if (this.isCurrentSelectCardsLegal()) {
            this.startPlayCardsAnim();
        }
        else {
            alert("当前选择的牌不合法~");
        }
    }

    private rearrangeCurrentPlayerCards() {
        var cards = this.player_cards_list[this.current_play_player_index];
        var card_len = cards.length;
        for (var i = 0; i < card_len; i++) {
            cards[i].base_layer.x = i * this.CARD_SPAN_DIS + this.player_cards_start_pos[this.current_play_player_index][0];
        }
    }

    private PLAY_CARD_START_POS_X:number = 40;
    private PLAY_CARD_START_POS_Y:number = 52.5;
    private PLAY_CARD_TIME:number = 200;
    public startPlayCardsAnim() {
        this.hideLastPlayCards();

        this.last_play_cards = [];
        var current_play_new_cards_list = []
        var current_cards_list = this.player_cards_list[this.current_play_player_index];
        for (var i = 0; i < current_cards_list.length; i++) {
            var card = current_cards_list[i];
            if (card.is_selected) {
                this.last_play_cards.push(card);
            }
            else {
                current_play_new_cards_list.push(card);
            }
        }
        this.player_cards_list[this.current_play_player_index] = current_play_new_cards_list;
        this.rearrangeCurrentPlayerCards();

        for (var i = 0; i < this.last_play_cards.length; i++) {
            card = this.last_play_cards[i];

            var pos_x = i * this.CARD_SPAN_DIS + this.PLAY_CARD_START_POS_X;
            var pos_y = this.PLAY_CARD_START_POS_Y;
            var tw = egret.Tween.get(card.base_layer);
            tw.to({x:pos_x, y:pos_y}, this.PLAY_CARD_TIME, egret.Ease.sineInOut);
        }

        var tw = egret.Tween.get(this);
        tw.wait(this.PLAY_CARD_TIME).call(this.endPlayCardsAnim, this);
    }
    public endPlayCardsAnim() {
        this.player_play_times_list[this.current_play_player_index]++;

        var cards = this.player_cards_list[this.current_play_player_index];
        var card_len = cards.length;
        if (card_len == 0) {
            this.showGameResult();
        }
        else {
            this.current_player_select_cards_sum = 0;
            this.player_pass_times = 0;

            this.current_play_player_index++;
            this.current_play_player_index = this.current_play_player_index % 3;

            this.main_view.showNextPlayerPlayBtns(this.current_play_player_index);
        }
    }

    private showGameResult() {
        var win_money = this.base_money * this.money_times;

        var farmer_index_1 = (this.landlord_player_index+1) % 3;
        var farmer_index_2 = (farmer_index_1+1) % 3;

        if (this.current_play_player_index == this.landlord_player_index) {
            alert("地主赢了！");

            if (this.player_play_times_list[farmer_index_1] == 0
                    && this.player_play_times_list[farmer_index_2] == 0) {
                win_money *= 2;
                alert("农民没出牌，春天！！！");
            }

            this.player_list[this.landlord_player_index].money += 2 * win_money;

            this.player_list[farmer_index_1].money -= win_money;
            this.player_list[farmer_index_2].money -= win_money;
        }
        else {
            alert("农民赢了！");

            if (this.player_play_times_list[this.landlord_player_index] == 1) {
                win_money *= 2;
                alert("地主只出了一次牌，春天！！！");
            }

            this.player_list[this.landlord_player_index].money -= 2 * win_money;

            this.player_list[farmer_index_1].money += win_money;
            this.player_list[farmer_index_2].money += win_money;
        }

        this.main_view.refreshPlayerMoney();
        this.main_view.showStartNewGameBtn();
    }

    private CARD_SELECT_POS_OFFSET_Y = 20;
    public selectCard(card) {
        if (card.is_selected) {
            return;
        }

        card.is_selected = true;
        card.base_layer.y -= this.CARD_SELECT_POS_OFFSET_Y;

        this.current_player_select_cards_sum++;

        if (this.current_player_select_cards_sum == 1) {
            this.main_view.setCurrentPlayBtnEnable(true);
        }
    }   
    public deselectCard(card) {
        if (!card.is_selected) {
            return;
        }

        card.is_selected = false;
        card.base_layer.y += this.CARD_SELECT_POS_OFFSET_Y;

        this.current_player_select_cards_sum--;
        if (this.current_player_select_cards_sum <= 0) {
            this.main_view.setCurrentPlayBtnEnable(false);
        }
    }

    private onTouchCard( evt ) {
        //console.log(evt.target);
        var cards_len = this.all_cards.length;
        var card = null;
        for (var i = 0; i < cards_len; i++) {
            if (evt.target == this.all_cards[i].front_img) {
                if (this.all_cards[i].player_index != this.current_play_player_index) {
                    return;
                }

                card = this.all_cards[i];
                break;
            }
        }

        if (card != null) {
            if (card.is_selected) {
                this.deselectCard(card);
            }
            else {
                this.selectCard(card);
            }
        }
    }
}