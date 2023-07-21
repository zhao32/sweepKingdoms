var WsEncoder = require("WsEncoder");
var MyProtocols = {

	send_C2SActivityList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5401);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5402: function (myDecoder) {
		var retObj = {};
		retObj.fixed_activities = [];
		let fixed_activities_size = myDecoder.readInt();
		if (fixed_activities_size > 0) {
			for (var i = 0; i < fixed_activities_size; i++) {
				retObj.fixed_activities[i] = {};
				retObj.fixed_activities[i].id = myDecoder.readInt();
				retObj.fixed_activities[i].level_index = myDecoder.readInt();
				retObj.fixed_activities[i].progress = myDecoder.readInt();
				retObj.fixed_activities[i].can_get_award = myDecoder.readBool();
			}
		}
		retObj.dynamic_activities = [];
		let dynamic_activities_size = myDecoder.readInt();
		if (dynamic_activities_size > 0) {
			for (var i = 0; i < dynamic_activities_size; i++) {
				retObj.dynamic_activities[i] = {};
				retObj.dynamic_activities[i].activeBigID = myDecoder.readInt();
				retObj.dynamic_activities[i].priority = myDecoder.readInt();
				retObj.dynamic_activities[i].des = myDecoder.readString();
				retObj.dynamic_activities[i].StartTime = myDecoder.readInt();
				retObj.dynamic_activities[i].EndTime = myDecoder.readInt();
				retObj.dynamic_activities[i].nComplete = myDecoder.readInt();
				retObj.dynamic_activities[i].sub_activities = [];
				let dynamic_activitiesi_sub_activities_size = myDecoder.readInt();
				if (dynamic_activitiesi_sub_activities_size > 0) {
					for (var sub_activities_idx = 0; sub_activities_idx < dynamic_activitiesi_sub_activities_size; sub_activities_idx++) {
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx] = {};
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].nSubCount = myDecoder.readInt();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].nNeedLevel = myDecoder.readInt();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].nNeedVipLevel = myDecoder.readInt();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].nNeedPassNoChapID = myDecoder.readInt();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].nState = myDecoder.readInt();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].nComplete = myDecoder.readInt();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].szSubDes = myDecoder.readString();
						retObj.dynamic_activities[i].sub_activities[sub_activities_idx].reward = [];
						let dynamic_activitiesi_sub_activitiessub_activities_idx_reward_size = myDecoder.readInt();
						if (dynamic_activitiesi_sub_activitiessub_activities_idx_reward_size > 0) {
							for (var reward_idx = 0; reward_idx < dynamic_activitiesi_sub_activitiessub_activities_idx_reward_size; reward_idx++) {
								retObj.dynamic_activities[i].sub_activities[sub_activities_idx].reward[reward_idx] = {};
								retObj.dynamic_activities[i].sub_activities[sub_activities_idx].reward[reward_idx].nID = myDecoder.readInt();
								retObj.dynamic_activities[i].sub_activities[sub_activities_idx].reward[reward_idx].nNum = myDecoder.readInt();
							}
						}
					}
				}
				retObj.dynamic_activities[i].hero_libao_config = [];
				let dynamic_activitiesi_hero_libao_config_size = myDecoder.readInt();
				if (dynamic_activitiesi_hero_libao_config_size > 0) {
					for (var hero_libao_config_idx = 0; hero_libao_config_idx < dynamic_activitiesi_hero_libao_config_size; hero_libao_config_idx++) {
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx] = {};
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].buy_count = myDecoder.readInt();
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].buy_count_total = myDecoder.readInt();
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].favor_rate = myDecoder.readInt();
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].price = myDecoder.readInt();
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].recharge_id = myDecoder.readInt();
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].extra_diamond = myDecoder.readInt();
						retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].reward = [];
						let dynamic_activitiesi_hero_libao_confighero_libao_config_idx_reward_size = myDecoder.readInt();
						if (dynamic_activitiesi_hero_libao_confighero_libao_config_idx_reward_size > 0) {
							for (var reward_idx = 0; reward_idx < dynamic_activitiesi_hero_libao_confighero_libao_config_idx_reward_size; reward_idx++) {
								retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].reward[reward_idx] = {};
								retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].reward[reward_idx].nID = myDecoder.readInt();
								retObj.dynamic_activities[i].hero_libao_config[hero_libao_config_idx].reward[reward_idx].nNum = myDecoder.readInt();
							}
						}
					}
				}
				let dynamic_activitiesi_lottery_wheel_config_exist = myDecoder.readBool();
				if (dynamic_activitiesi_lottery_wheel_config_exist == true) {
					retObj.dynamic_activities[i].lottery_wheel_config = {};
					retObj.dynamic_activities[i].lottery_wheel_config.my_free_count = myDecoder.readInt();
					retObj.dynamic_activities[i].lottery_wheel_config.my_pay_count = myDecoder.readInt();
					retObj.dynamic_activities[i].lottery_wheel_config.daily_free_count = myDecoder.readInt();
					retObj.dynamic_activities[i].lottery_wheel_config.pay_count = myDecoder.readInt();
					retObj.dynamic_activities[i].lottery_wheel_config.pay_price = myDecoder.readInt();
					retObj.dynamic_activities[i].lottery_wheel_config.reward = [];
					let dynamic_activitiesi_lottery_wheel_config_reward_size = myDecoder.readInt();
					if (dynamic_activitiesi_lottery_wheel_config_reward_size > 0) {
						for (var reward_idx = 0; reward_idx < dynamic_activitiesi_lottery_wheel_config_reward_size; reward_idx++) {
							retObj.dynamic_activities[i].lottery_wheel_config.reward[reward_idx] = {};
							retObj.dynamic_activities[i].lottery_wheel_config.reward[reward_idx].nID = myDecoder.readInt();
							retObj.dynamic_activities[i].lottery_wheel_config.reward[reward_idx].nNum = myDecoder.readInt();
						}
					}
				}
			}
		}
		return retObj;
	},

	send_C2SActivitiesGetAward: function (senderSocket, p_activeIdType, p_item_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5403);
		myEncoder.writeInt(p_activeIdType);
		myEncoder.writeInt(p_item_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5404: function (myDecoder) {
		var retObj = {};
		retObj.activeIdType = myDecoder.readInt();
		retObj.item_index = myDecoder.readInt();
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].nID = myDecoder.readInt();
				retObj.gain[i].nNum = myDecoder.readInt();
			}
		}
		retObj.lottery_is_pay = myDecoder.readBool();
		return retObj;
	},

	get_5406: function (myDecoder) {
		var retObj = {};
		retObj.activeIdType = myDecoder.readInt();
		retObj.progress = myDecoder.readInt();
		return retObj;
	},

	send_C2SQiZhenYiBaoView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5407);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5408: function (myDecoder) {
		var retObj = {};
		retObj.fixed_award = [];
		let fixed_award_size = myDecoder.readInt();
		if (fixed_award_size > 0) {
			for (var i = 0; i < fixed_award_size; i++) {
				retObj.fixed_award[i] = {};
				retObj.fixed_award[i].nID = myDecoder.readInt();
				retObj.fixed_award[i].nNum = myDecoder.readInt();
			}
		}
		let big_award_exist = myDecoder.readBool();
		if (big_award_exist == true) {
			retObj.big_award = {};
			retObj.big_award.nID = myDecoder.readInt();
			retObj.big_award.nNum = myDecoder.readInt();
		}
		retObj.my_count = myDecoder.readInt();
		retObj.end_cd_time = myDecoder.readInt();
		retObj.player_count_kaijiang = myDecoder.readInt();
		retObj.cost_diamond = myDecoder.readInt();
		retObj.big_award_value = myDecoder.readInt();
		retObj.players = [];
		let players_size = myDecoder.readInt();
		if (players_size > 0) {
			for (var i = 0; i < players_size; i++) {
				retObj.players[i] = {};
				retObj.players[i].player_id = myDecoder.readInt();
				retObj.players[i].player_name = myDecoder.readString();
				retObj.players[i].count = myDecoder.readInt();
			}
		}
		retObj.history_players = [];
		let history_players_size = myDecoder.readInt();
		if (history_players_size > 0) {
			for (var i = 0; i < history_players_size; i++) {
				retObj.history_players[i] = {};
				retObj.history_players[i].player_id = myDecoder.readInt();
				retObj.history_players[i].player_name = myDecoder.readString();
				retObj.history_players[i].count = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SQiZhenYiBaoJoin: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5409);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5410: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	get_5412: function (myDecoder) {
		var retObj = {};
		let award_player_exist = myDecoder.readBool();
		if (award_player_exist == true) {
			retObj.award_player = {};
			retObj.award_player.player_id = myDecoder.readInt();
			retObj.award_player.player_name = myDecoder.readString();
			retObj.award_player.count = myDecoder.readInt();
		}
		retObj.hero_tpl_id = myDecoder.readInt();
		return retObj;
	},

	send_C2SActivitiesView: function (senderSocket, p_module_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5201);
		myEncoder.writeInt(p_module_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5202: function (myDecoder) {
		var retObj = {};
		retObj.module_id = myDecoder.readInt();
		retObj.attack_count = myDecoder.readInt();
		retObj.buy_count = myDecoder.readInt();
		retObj.info = [];
		let info_size = myDecoder.readInt();
		if (info_size > 0) {
			for (var i = 0; i < info_size; i++) {
				retObj.info[i] = {};
				retObj.info[i].activity_type = myDecoder.readInt();
				retObj.info[i].boxAwardCanGet = [];
				let infoi_boxAwardCanGet_size = myDecoder.readInt();
				if (infoi_boxAwardCanGet_size > 0) {
					for (var boxAwardCanGet_idx = 0; boxAwardCanGet_idx < infoi_boxAwardCanGet_size; boxAwardCanGet_idx++) {
						retObj.info[i].boxAwardCanGet[boxAwardCanGet_idx] = myDecoder.readBool();
					}
				}
				retObj.info[i].star = [];
				let infoi_star_size = myDecoder.readInt();
				if (infoi_star_size > 0) {
					for (var star_idx = 0; star_idx < infoi_star_size; star_idx++) {
						retObj.info[i].star[star_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SActivitiesBattlePass: function (senderSocket, p_module_id, p_activity_type, p_level_index, p_seconds, p_hpPercent, p_die_num) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5203);
		myEncoder.writeInt(p_module_id);
		myEncoder.writeInt(p_activity_type);
		myEncoder.writeInt(p_level_index);
		myEncoder.writeInt(p_seconds);
		myEncoder.writeInt(p_hpPercent);
		myEncoder.writeInt(p_die_num);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5204: function (myDecoder) {
		var retObj = {};
		retObj.module_id = myDecoder.readInt();
		retObj.activity_type = myDecoder.readInt();
		retObj.level_index = myDecoder.readInt();
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].item_template_id = myDecoder.readInt();
				retObj.gain[i].item_count = myDecoder.readInt();
			}
		}
		retObj.star = myDecoder.readInt();
		retObj.attack_count = myDecoder.readInt();
		retObj.boxAwardCanGet = myDecoder.readBool();
		return retObj;
	},

	send_C2SActivitiesClaimAward: function (senderSocket, p_module_id, p_activity_type, p_level_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5205);
		myEncoder.writeInt(p_module_id);
		myEncoder.writeInt(p_activity_type);
		myEncoder.writeInt(p_level_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5206: function (myDecoder) {
		var retObj = {};
		retObj.module_id = myDecoder.readInt();
		retObj.activity_type = myDecoder.readInt();
		retObj.level_index = myDecoder.readInt();
		return retObj;
	},

	send_C2SActivitiesBattleBuyTicket: function (senderSocket, p_module_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5207);
		myEncoder.writeInt(p_module_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5208: function (myDecoder) {
		var retObj = {};
		retObj.module_id = myDecoder.readInt();
		retObj.buyTimes = myDecoder.readInt();
		retObj.costMoney = myDecoder.readInt();
		return retObj;
	},

	send_C2SActivitiesBattleFormation: function (senderSocket, p_fid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5209);
		myEncoder.writeInt(p_fid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5210: function (myDecoder) {
		var retObj = {};
		retObj.exist = myDecoder.readBool();
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		return retObj;
	},

	send_C2SActivitiesBattleSweep: function (senderSocket, p_module_id, p_activity_type, p_level_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5211);
		myEncoder.writeInt(p_module_id);
		myEncoder.writeInt(p_activity_type);
		myEncoder.writeInt(p_level_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5212: function (myDecoder) {
		var retObj = {};
		retObj.module_id = myDecoder.readInt();
		retObj.activity_type = myDecoder.readInt();
		retObj.level_index = myDecoder.readInt();
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].item_template_id = myDecoder.readInt();
				retObj.gain[i].item_count = myDecoder.readInt();
			}
		}
		retObj.attack_count = myDecoder.readInt();
		retObj.boxAwardCanGet = myDecoder.readBool();
		return retObj;
	},

	send_C2SArenaExchangeList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3801);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3802: function (myDecoder) {
		var retObj = {};
		retObj.buy_count = [];
		let buy_count_size = myDecoder.readInt();
		if (buy_count_size > 0) {
			for (var i = 0; i < buy_count_size; i++) {
				retObj.buy_count[i] = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SArenaExchange: function (senderSocket, p_slot_index, p_num) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3803);
		myEncoder.writeInt(p_slot_index);
		myEncoder.writeInt(p_num);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3804: function (myDecoder) {
		var retObj = {};
		retObj.slot_index = myDecoder.readInt();
		retObj.buy_count = myDecoder.readInt();
		let rewards_exist = myDecoder.readBool();
		if (rewards_exist == true) {
			retObj.rewards = {};
			retObj.rewards.item_template_id = myDecoder.readInt();
			retObj.rewards.item_count = myDecoder.readInt();
		}
		console.log('兑换石符返回：' + JSON.stringify(retObj))
		return retObj;
	},

	send_C2SArenaView: function (senderSocket, p_guideReq) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3805);
		myEncoder.writeBool(p_guideReq);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3806: function (myDecoder) {
		var retObj = {};
		retObj.my_rank = myDecoder.readInt();
		retObj.enemys = [];
		let enemys_size = myDecoder.readInt();
		if (enemys_size > 0) {
			for (var i = 0; i < enemys_size; i++) {
				retObj.enemys[i] = {};
				retObj.enemys[i].sexId = myDecoder.readInt();
				retObj.enemys[i].playerId = myDecoder.readInt();
				retObj.enemys[i].level = myDecoder.readInt();
				retObj.enemys[i].rank = myDecoder.readInt();
				retObj.enemys[i].fight = myDecoder.readInt();
				retObj.enemys[i].nickname = myDecoder.readString();
			}
		}
		retObj.top_ranks = [];
		let top_ranks_size = myDecoder.readInt();
		if (top_ranks_size > 0) {
			for (var i = 0; i < top_ranks_size; i++) {
				retObj.top_ranks[i] = {};
				retObj.top_ranks[i].sexId = myDecoder.readInt();
				retObj.top_ranks[i].playerId = myDecoder.readInt();
				retObj.top_ranks[i].level = myDecoder.readInt();
				retObj.top_ranks[i].rank = myDecoder.readInt();
				retObj.top_ranks[i].fight = myDecoder.readInt();
				retObj.top_ranks[i].nickname = myDecoder.readString();
			}
		}
		retObj.guideReq = myDecoder.readBool();
		return retObj;
	},

	send_C2SArenaEnemyDetail: function (senderSocket, p_enemy_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3807);
		myEncoder.writeInt(p_enemy_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3808: function (myDecoder) {
		var retObj = {};
		retObj.enemy_index = myDecoder.readInt();
		let base_info_exist = myDecoder.readBool();
		if (base_info_exist == true) {
			retObj.base_info = {};
			retObj.base_info.sexId = myDecoder.readInt();
			retObj.base_info.playerId = myDecoder.readInt();
			retObj.base_info.level = myDecoder.readInt();
			retObj.base_info.rank = myDecoder.readInt();
			retObj.base_info.fight = myDecoder.readInt();
			retObj.base_info.nickname = myDecoder.readString();
		}
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].extra_props = [];
				let cardsi_extra_props_size = myDecoder.readInt();
				if (cardsi_extra_props_size > 0) {
					for (var extra_props_idx = 0; extra_props_idx < cardsi_extra_props_size; extra_props_idx++) {
						retObj.cards[i].extra_props[extra_props_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SArenaRefreshEnemy: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3809);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3810: function (myDecoder) {
		var retObj = {};
		retObj.enemys = [];
		let enemys_size = myDecoder.readInt();
		if (enemys_size > 0) {
			for (var i = 0; i < enemys_size; i++) {
				retObj.enemys[i] = {};
				retObj.enemys[i].sexId = myDecoder.readInt();
				retObj.enemys[i].playerId = myDecoder.readInt();
				retObj.enemys[i].level = myDecoder.readInt();
				retObj.enemys[i].rank = myDecoder.readInt();
				retObj.enemys[i].fight = myDecoder.readInt();
				retObj.enemys[i].nickname = myDecoder.readString();
			}
		}
		return retObj;
	},

	send_C2SArenaBattleStart: function (senderSocket, p_enemy_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3811);
		myEncoder.writeInt(p_enemy_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3812: function (myDecoder) {
		var retObj = {};
		retObj.result = myDecoder.readBool();
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2SArenaBattleCalculate: function (senderSocket, p_enemy_index, p_result, p_rand_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3813);
		myEncoder.writeInt(p_enemy_index);
		myEncoder.writeInt(p_result);
		myEncoder.writeLong(p_rand_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3814: function (myDecoder) {
		var retObj = {};
		retObj.result = myDecoder.readInt();
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].item_template_id = myDecoder.readInt();
				retObj.gain[i].item_count = myDecoder.readInt();
			}
		}
		let dirtyItems_exist = myDecoder.readBool();
		if (dirtyItems_exist == true) {
			retObj.dirtyItems = {};
			retObj.dirtyItems.item_template_id = myDecoder.readInt();
			retObj.dirtyItems.item_count = myDecoder.readInt();
		}
		retObj.new_rank = myDecoder.readInt();
		retObj.enemys = [];
		let enemys_size = myDecoder.readInt();
		if (enemys_size > 0) {
			for (var i = 0; i < enemys_size; i++) {
				retObj.enemys[i] = {};
				retObj.enemys[i].sexId = myDecoder.readInt();
				retObj.enemys[i].playerId = myDecoder.readInt();
				retObj.enemys[i].level = myDecoder.readInt();
				retObj.enemys[i].rank = myDecoder.readInt();
				retObj.enemys[i].fight = myDecoder.readInt();
				retObj.enemys[i].nickname = myDecoder.readString();
			}
		}
		retObj.maxRank = myDecoder.readInt();
		retObj.rankImproveMoney = myDecoder.readInt();
		return retObj;
	},

	send_C2SLuckyRankInfo: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3815);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3816: function (myDecoder) {
		var retObj = {};
		retObj.prevInfos = [];
		let prevInfos_size = myDecoder.readInt();
		if (prevInfos_size > 0) {
			for (var i = 0; i < prevInfos_size; i++) {
				retObj.prevInfos[i] = {};
				retObj.prevInfos[i].rank = myDecoder.readInt();
				retObj.prevInfos[i].name = myDecoder.readString();
				retObj.prevInfos[i].money = myDecoder.readInt();
			}
		}
		retObj.infos = [];
		let infos_size = myDecoder.readInt();
		if (infos_size > 0) {
			for (var i = 0; i < infos_size; i++) {
				retObj.infos[i] = {};
				retObj.infos[i].rank = myDecoder.readInt();
				retObj.infos[i].name = myDecoder.readString();
				retObj.infos[i].money = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SArenaBattleRecord: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3817);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3818: function (myDecoder) {
		var retObj = {};
		retObj.reports = [];
		let reports_size = myDecoder.readInt();
		if (reports_size > 0) {
			for (var i = 0; i < reports_size; i++) {
				retObj.reports[i] = {};
				retObj.reports[i].nickname = myDecoder.readString();
				retObj.reports[i].type = myDecoder.readInt();
				retObj.reports[i].rankChange = myDecoder.readInt();
				retObj.reports[i].rank = myDecoder.readInt();
				retObj.reports[i].result = myDecoder.readInt();
				retObj.reports[i].time = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SArenaFormation: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3819);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3820: function (myDecoder) {
		var retObj = {};
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		return retObj;
	},

	send_C2SArenaPlayerDetail: function (senderSocket, p_player_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3821);
		myEncoder.writeInt(p_player_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3822: function (myDecoder) {
		var retObj = {};
		retObj.player_id = myDecoder.readInt();
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();


				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].extra_props = [];
				let cardsi_extra_props_size = myDecoder.readInt();
				if (cardsi_extra_props_size > 0) {
					for (var extra_props_idx = 0; extra_props_idx < cardsi_extra_props_size; extra_props_idx++) {
						retObj.cards[i].extra_props[extra_props_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SArenaTopRankView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3823);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3824: function (myDecoder) {
		var retObj = {};
		retObj.top_ranks = [];
		let top_ranks_size = myDecoder.readInt();
		if (top_ranks_size > 0) {
			for (var i = 0; i < top_ranks_size; i++) {
				retObj.top_ranks[i] = {};
				retObj.top_ranks[i].sexId = myDecoder.readInt();
				retObj.top_ranks[i].playerId = myDecoder.readInt();
				retObj.top_ranks[i].level = myDecoder.readInt();
				retObj.top_ranks[i].rank = myDecoder.readInt();
				retObj.top_ranks[i].fight = myDecoder.readInt();
				retObj.top_ranks[i].nickname = myDecoder.readString();
			}
		}
		return retObj;
	},

	send_C2SPkEnemyFormation: function (senderSocket, p_target_player_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3825);
		myEncoder.writeInt(p_target_player_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3826: function (myDecoder) {
		var retObj = {};
		retObj.target_player_id = myDecoder.readInt();
		let base_info_exist = myDecoder.readBool();
		if (base_info_exist == true) {
			retObj.base_info = {};
			retObj.base_info.sexId = myDecoder.readInt();
			retObj.base_info.playerId = myDecoder.readInt();
			retObj.base_info.level = myDecoder.readInt();
			retObj.base_info.rank = myDecoder.readInt();
			retObj.base_info.fight = myDecoder.readInt();
			retObj.base_info.nickname = myDecoder.readString();
		}
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].extra_props = [];
				let cardsi_extra_props_size = myDecoder.readInt();
				if (cardsi_extra_props_size > 0) {
					for (var extra_props_idx = 0; extra_props_idx < cardsi_extra_props_size; extra_props_idx++) {
						retObj.cards[i].extra_props[extra_props_idx] = myDecoder.readInt();
					}
				}
			}
		}
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2SPkBattleCalculate: function (senderSocket, p_target_player_id, p_result, p_rand_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3827);
		myEncoder.writeInt(p_target_player_id);
		myEncoder.writeInt(p_result);
		myEncoder.writeLong(p_rand_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3828: function (myDecoder) {
		var retObj = {};
		retObj.target_player_id = myDecoder.readInt();
		retObj.result = myDecoder.readInt();
		retObj.winLooseCount = [];
		let winLooseCount_size = myDecoder.readInt();
		if (winLooseCount_size > 0) {
			for (var i = 0; i < winLooseCount_size; i++) {
				retObj.winLooseCount[i] = myDecoder.readInt();
			}
		}
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].item_template_id = myDecoder.readInt();
				retObj.gain[i].item_count = myDecoder.readInt();
			}
		}
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2SListSign: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3601);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3602: function (myDecoder) {
		var retObj = {};
		retObj.signed_day_num = myDecoder.readInt();
		retObj.today_day_num = myDecoder.readInt();
		return retObj;
	},

	send_C2SGetSignAward: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3603);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3604: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SListOnlineAward: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3611);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3612: function (myDecoder) {
		var retObj = {};
		retObj.curr_time = myDecoder.readInt();
		retObj.online_time = myDecoder.readInt();
		retObj.award_temp = [];
		let award_temp_size = myDecoder.readInt();
		if (award_temp_size > 0) {
			for (var i = 0; i < award_temp_size; i++) {
				retObj.award_temp[i] = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SOnlineTime: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3613);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3614: function (myDecoder) {
		var retObj = {};
		retObj.online_time = myDecoder.readInt();
		return retObj;
	},

	send_C2SGetOnlineAward: function (senderSocket, p_template_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3615);
		myEncoder.writeInt(p_template_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3616: function (myDecoder) {
		var retObj = {};
		retObj.template_id = myDecoder.readInt();
		return retObj;
	},

	send_C2SKeyConvert: function (senderSocket, p_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3621);
		myEncoder.writeString(p_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3622: function (myDecoder) {
		var retObj = {};
		retObj.result_id = myDecoder.readInt();
		retObj.reward_item = [];
		let reward_item_size = myDecoder.readInt();
		if (reward_item_size > 0) {
			for (var i = 0; i < reward_item_size; i++) {
				retObj.reward_item[i] = {};
				retObj.reward_item[i].itemId = myDecoder.readInt();
				retObj.reward_item[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SBagItems: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10301);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10302: function (myDecoder) {
		var retObj = {};
		retObj.item_list = [];
		let item_list_size = myDecoder.readInt();
		if (item_list_size > 0) {
			for (var i = 0; i < item_list_size; i++) {
				retObj.item_list[i] = {};
				retObj.item_list[i].uuid = myDecoder.readString();
				retObj.item_list[i].template_id = myDecoder.readInt();
				retObj.item_list[i].enhance_level = myDecoder.readInt();
				retObj.item_list[i].stars = myDecoder.readInt();
				retObj.item_list[i].num = myDecoder.readInt();
				retObj.item_list[i].bagId = myDecoder.readInt();
				retObj.item_list[i].hpEx = myDecoder.readInt();
				retObj.item_list[i].atkEx = myDecoder.readInt();
				retObj.item_list[i].defEx = myDecoder.readInt();
				retObj.item_list[i].attrEx = [];
				let item_listi_attrEx_size = myDecoder.readInt();
				if (item_listi_attrEx_size > 0) {
					for (var attrEx_idx = 0; attrEx_idx < item_listi_attrEx_size; attrEx_idx++) {
						retObj.item_list[i].attrEx[attrEx_idx] = {};
						retObj.item_list[i].attrEx[attrEx_idx].id = myDecoder.readInt();
						retObj.item_list[i].attrEx[attrEx_idx].num = myDecoder.readInt();
					}
				}
				let item_listi_unitAttr_exist = myDecoder.readBool();
				if (item_listi_unitAttr_exist == true) {
					retObj.item_list[i].unitAttr = {};
					retObj.item_list[i].unitAttr.id = myDecoder.readInt();
					retObj.item_list[i].unitAttr.num = myDecoder.readInt();
				}
				retObj.item_list[i].exp = myDecoder.readInt();
			}
		}
		retObj.expand_info = [];
		let expand_info_size = myDecoder.readInt();
		if (expand_info_size > 0) {
			for (var i = 0; i < expand_info_size; i++) {
				retObj.expand_info[i] = {};
				retObj.expand_info[i].bag_id = myDecoder.readInt();
				retObj.expand_info[i].expand_count = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SSellItem: function (senderSocket, p_template_id, p_bagId, p_count) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10303);
		myEncoder.writeInt(p_template_id);
		myEncoder.writeInt(p_bagId);
		myEncoder.writeInt(p_count);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10304: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SUseItem: function (senderSocket, p_items) {
		console.log('p_items:' + JSON.stringify(p_items))
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10305);
		if (p_items == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_items.length);
			p_items.forEach(function (p_items_v) {
				myEncoder.writeInt(p_items_v.template_id);
				myEncoder.writeInt(p_items_v.count);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10306: function (myDecoder) {
		var retObj = {};
		retObj.reward_item = [];
		let reward_item_size = myDecoder.readInt();
		if (reward_item_size > 0) {
			for (var i = 0; i < reward_item_size; i++) {
				retObj.reward_item[i] = {};
				retObj.reward_item[i].template_id = myDecoder.readInt();
				retObj.reward_item[i].bagId = myDecoder.readInt();
				retObj.reward_item[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},

	get_10308: function (myDecoder) {
		var retObj = {};
		let item_info_exist = myDecoder.readBool();
		if (item_info_exist == true) {
			retObj.item_info = {};
			retObj.item_info.uuid = myDecoder.readString();
			retObj.item_info.template_id = myDecoder.readInt();
			retObj.item_info.enhance_level = myDecoder.readInt();
			retObj.item_info.stars = myDecoder.readInt();
			retObj.item_info.num = myDecoder.readInt();
			retObj.item_info.bagId = myDecoder.readInt();
			retObj.item_info.hpEx = myDecoder.readInt();
			retObj.item_info.atkEx = myDecoder.readInt();
			retObj.item_info.defEx = myDecoder.readInt();
			retObj.item_info.attrEx = [];
			let item_info_attrEx_size = myDecoder.readInt();
			if (item_info_attrEx_size > 0) {
				for (var attrEx_idx = 0; attrEx_idx < item_info_attrEx_size; attrEx_idx++) {
					retObj.item_info.attrEx[attrEx_idx] = {};
					retObj.item_info.attrEx[attrEx_idx].id = myDecoder.readInt();
					retObj.item_info.attrEx[attrEx_idx].num = myDecoder.readInt();
				}
			}
			let item_info_unitAttr_exist = myDecoder.readBool();
			if (item_info_unitAttr_exist == true) {
				retObj.item_info.unitAttr = {};
				retObj.item_info.unitAttr.id = myDecoder.readInt();
				retObj.item_info.unitAttr.num = myDecoder.readInt();
			}
			retObj.item_info.exp = myDecoder.readInt();
		}
		console.log(JSON.stringify(retObj))
		return retObj;
	},

	send_C2SExpandBag: function (senderSocket, p_bag_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10309);
		myEncoder.writeInt(p_bag_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10310: function (myDecoder) {
		var retObj = {};
		retObj.bag_id = myDecoder.readInt();
		retObj.expand_count = myDecoder.readInt();
		return retObj;
	},

	send_C2SEquipEnhance: function (senderSocket, p_equip_uuid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10311);
		myEncoder.writeString(p_equip_uuid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10312: function (myDecoder) {
		var retObj = {};
		retObj.equip_uuid = myDecoder.readString();
		retObj.enhance_level = myDecoder.readInt();
		retObj.card_id = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SEquipEnhanceAuto: function (senderSocket, p_equip_uuid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10313);
		myEncoder.writeString(p_equip_uuid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10314: function (myDecoder) {
		var retObj = {};
		retObj.equip_uuid = myDecoder.readString();
		retObj.infos = [];
		let infos_size = myDecoder.readInt();
		if (infos_size > 0) {
			for (var i = 0; i < infos_size; i++) {
				retObj.infos[i] = {};
				retObj.infos[i].x = myDecoder.readInt();
				retObj.infos[i].level = myDecoder.readInt();
			}
		}
		retObj.enhance_level = myDecoder.readInt();
		retObj.card_id = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SEquipEnhanceAll: function (senderSocket, p_card_tpl_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10315);
		myEncoder.writeInt(p_card_tpl_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10316: function (myDecoder) {
		var retObj = {};
		retObj.card_tpl_id = myDecoder.readInt();
		retObj.item_infos = [];
		let item_infos_size = myDecoder.readInt();
		if (item_infos_size > 0) {
			for (var i = 0; i < item_infos_size; i++) {
				retObj.item_infos[i] = {};
				retObj.item_infos[i].itemId = myDecoder.readString();
				retObj.item_infos[i].enhance_level = myDecoder.readInt();
				retObj.item_infos[i].crit_count = myDecoder.readInt();
			}
		}
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SEquipRefresh: function (senderSocket, p_equip_uuid, p_costType, p_refreshType) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10317);
		myEncoder.writeString(p_equip_uuid);
		myEncoder.writeInt(p_costType);
		myEncoder.writeInt(p_refreshType);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10318: function (myDecoder) {
		var retObj = {};
		retObj.equip_uuid = myDecoder.readString();
		retObj.hpEx = myDecoder.readInt();
		retObj.atkEx = myDecoder.readInt();
		retObj.defEx = myDecoder.readInt();
		retObj.attrEx = [];
		let attrEx_size = myDecoder.readInt();
		if (attrEx_size > 0) {
			for (var i = 0; i < attrEx_size; i++) {
				retObj.attrEx[i] = {};
				retObj.attrEx[i].id = myDecoder.readInt();
				retObj.attrEx[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SEquipRefreshSave: function (senderSocket, p_equip_uuid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10319);
		myEncoder.writeString(p_equip_uuid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10320: function (myDecoder) {
		var retObj = {};
		retObj.equip_uuid = myDecoder.readString();
		retObj.hpEx = myDecoder.readInt();
		retObj.atkEx = myDecoder.readInt();
		retObj.defEx = myDecoder.readInt();
		retObj.attrEx = [];
		let attrEx_size = myDecoder.readInt();
		if (attrEx_size > 0) {
			for (var i = 0; i < attrEx_size; i++) {
				retObj.attrEx[i] = {};
				retObj.attrEx[i].id = myDecoder.readInt();
				retObj.attrEx[i].num = myDecoder.readInt();
			}
		}
		retObj.card_id = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2STreasureEnhance: function (senderSocket, p_treasure_uuid, p_sourceItemAry) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10321);
		myEncoder.writeString(p_treasure_uuid);
		if (p_sourceItemAry == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_sourceItemAry.length);
			p_sourceItemAry.forEach(function (p_sourceItemAry_v) {
				myEncoder.writeString(p_sourceItemAry_v);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10322: function (myDecoder) {
		var retObj = {};
		retObj.treasure_uuid = myDecoder.readString();
		retObj.exp = myDecoder.readInt();
		retObj.enhance_level = myDecoder.readInt();
		retObj.card_id = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2STreasureRefresh: function (senderSocket, p_treasure_uuid, p_sourceItemAry) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10323);
		myEncoder.writeString(p_treasure_uuid);
		if (p_sourceItemAry == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_sourceItemAry.length);
			p_sourceItemAry.forEach(function (p_sourceItemAry_v) {
				myEncoder.writeString(p_sourceItemAry_v);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10324: function (myDecoder) {
		var retObj = {};
		retObj.treasure_uuid = myDecoder.readString();
		retObj.stars = myDecoder.readInt();
		retObj.card_id = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2STreasureFragCompose: function (senderSocket, p_templateId, p_num) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10325);
		myEncoder.writeInt(p_templateId);
		myEncoder.writeInt(p_num);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10326: function (myDecoder) {
		var retObj = {};
		retObj.templateId = myDecoder.readInt();
		retObj.treasure_uuid = myDecoder.readString();
		return retObj;
	},

	send_C2SEquipFragCompose: function (senderSocket, p_frag_templateId) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10327);
		myEncoder.writeInt(p_frag_templateId);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10328: function (myDecoder) {
		var retObj = {};
		let item_exist = myDecoder.readBool();
		if (item_exist == true) {
			retObj.item = {};
			retObj.item.uuid = myDecoder.readString();
			retObj.item.template_id = myDecoder.readInt();
			retObj.item.enhance_level = myDecoder.readInt();
			retObj.item.stars = myDecoder.readInt();
			retObj.item.num = myDecoder.readInt();
			retObj.item.bagId = myDecoder.readInt();
			retObj.item.hpEx = myDecoder.readInt();
			retObj.item.atkEx = myDecoder.readInt();
			retObj.item.defEx = myDecoder.readInt();
			retObj.item.attrEx = [];
			let item_attrEx_size = myDecoder.readInt();
			if (item_attrEx_size > 0) {
				for (var attrEx_idx = 0; attrEx_idx < item_attrEx_size; attrEx_idx++) {
					retObj.item.attrEx[attrEx_idx] = {};
					retObj.item.attrEx[attrEx_idx].id = myDecoder.readInt();
					retObj.item.attrEx[attrEx_idx].num = myDecoder.readInt();
				}
			}
			let item_unitAttr_exist = myDecoder.readBool();
			if (item_unitAttr_exist == true) {
				retObj.item.unitAttr = {};
				retObj.item.unitAttr.id = myDecoder.readInt();
				retObj.item.unitAttr.num = myDecoder.readInt();
			}
			retObj.item.exp = myDecoder.readInt();
		}
		return retObj;
	},

	/**请求矿场列表 */
	send_C2SMineList: function (senderSocket, p_level_index, p_page_index, county) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3101);
		myEncoder.writeInt(p_level_index);
		myEncoder.writeInt(p_page_index);
		myEncoder.writeInt(county);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3102: function (myDecoder) {
		console.log(`------------3102-----------`)
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.page_index = myDecoder.readInt();
		retObj.contry = myDecoder.readInt();
		retObj.pagecount = myDecoder.readInt();
		retObj.my_income = [];
		let my_income_size = myDecoder.readInt();
		if (my_income_size > 0) {
			for (var i = 0; i < my_income_size; i++) {
				retObj.my_income[i] = myDecoder.readInt();
			}
		}
		retObj.my_hold = [];
		let my_hold_size = myDecoder.readInt();
		if (my_hold_size > 0) {
			for (var i = 0; i < my_hold_size; i++) {
				retObj.my_hold[i] = myDecoder.readInt();
			}
		}
		retObj.my_cd_time = [];
		let my_cd_time_size = myDecoder.readInt();
		if (my_cd_time_size > 0) {
			for (var i = 0; i < my_cd_time_size; i++) {
				retObj.my_cd_time[i] = myDecoder.readInt();
			}
		}
		retObj.mine_points = [];
		let mine_points_size = myDecoder.readInt();
		if (mine_points_size > 0) {
			for (var i = 0; i < mine_points_size; i++) {
				retObj.mine_points[i] = {};
				let mine_pointsi_hold_player_exist = myDecoder.readBool();
				if (mine_pointsi_hold_player_exist == true) {
					retObj.mine_points[i].hold_player = {};
					retObj.mine_points[i].hold_player.id = myDecoder.readInt();
					retObj.mine_points[i].hold_player.nickname = myDecoder.readString();
					retObj.mine_points[i].hold_player.level = myDecoder.readInt();
					retObj.mine_points[i].hold_player.icon = myDecoder.readInt();
					retObj.mine_points[i].hold_player.head_frame_id = myDecoder.readInt();
					retObj.mine_points[i].hold_player.fight = myDecoder.readInt();
					retObj.mine_points[i].hold_player.cd_time = myDecoder.readInt();
					retObj.mine_points[i].hold_player.group = myDecoder.readInt();
					retObj.mine_points[i].hold_player.lv = myDecoder.readInt();
					//  debugger;
					retObj.mine_points[i].hold_player.page = myDecoder.readInt();
					retObj.mine_points[i].hold_player.idx = myDecoder.readInt();
					retObj.mine_points[i].hold_player.country = myDecoder.readInt();
					retObj.mine_points[i].hold_player.award = myDecoder.readInt();

				}
			}
		}
		retObj.my_points = [];
		let my_points_size = myDecoder.readInt();
		if (my_points_size > 0) {
			for (var i = 0; i < my_points_size; i++) {
				retObj.my_points[i] = {};
				let my_pointssi_hold_player_exist = myDecoder.readBool();
				if (my_pointssi_hold_player_exist == true) {
					retObj.my_points[i].hold_player = {};
					retObj.my_points[i].hold_player.id = myDecoder.readInt();
					retObj.my_points[i].hold_player.nickname = myDecoder.readString();
					retObj.my_points[i].hold_player.level = myDecoder.readInt();
					retObj.my_points[i].hold_player.icon = myDecoder.readInt();
					retObj.my_points[i].hold_player.head_frame_id = myDecoder.readInt();
					retObj.my_points[i].hold_player.fight = myDecoder.readInt();
					retObj.my_points[i].hold_player.cd_time = myDecoder.readInt();
					retObj.my_points[i].hold_player.group = myDecoder.readInt();
					retObj.my_points[i].hold_player.lv = myDecoder.readInt();

					retObj.my_points[i].hold_player.page = myDecoder.readInt();
					retObj.my_points[i].hold_player.idx = myDecoder.readInt();
					retObj.my_points[i].hold_player.country = myDecoder.readInt();
					retObj.my_points[i].hold_player.award = myDecoder.readInt();
				}
			}
		}

		console.log('矿场返回：' + JSON.stringify(retObj))
		return retObj;
	},
	/**请求敌方的矿场防守  */
	send_C2SMineEnemyDetail: function (senderSocket, p_level_index, p_point_index, country) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3103);
		myEncoder.writeInt(p_level_index);
		myEncoder.writeInt(p_point_index);
		myEncoder.writeInt(country);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3104: function (myDecoder) {
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.point_index = myDecoder.readInt();
		let base_info_exist = myDecoder.readBool();
		if (base_info_exist == true) {
			retObj.base_info = {};
			retObj.base_info.id = myDecoder.readInt();
			retObj.base_info.nickname = myDecoder.readString();
			retObj.base_info.level = myDecoder.readInt();
			retObj.base_info.icon = myDecoder.readInt();
			retObj.base_info.head_frame_id = myDecoder.readInt();
			retObj.base_info.fight = myDecoder.readInt();
			retObj.base_info.cd_time = myDecoder.readInt();
		}
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			// retObj.formation.d = myDecoder.readInt();
			// retObj.formation.e = myDecoder.readInt();
			// retObj.formation.f = myDecoder.readInt();
			// retObj.formation.g = myDecoder.readInt();
			// retObj.formation.h = myDecoder.readInt();
			// retObj.formation.i = myDecoder.readInt();
			// retObj.formation.j = myDecoder.readInt();
		}

		/**已经在矿里的兵 */
		retObj.soliderUsed = []
		let bing_size = myDecoder.readInt();
		if (bing_size > 0) {
			for (var i = 0; i < bing_size; i++) {

				retObj.soliderUsed[i] = {};
				retObj.soliderUsed[i].arm = myDecoder.readInt();
				retObj.soliderUsed[i].count = myDecoder.readInt();
			}
		}

		/**可以往矿里调的兵 */
		retObj.soliderUse = []
		let solider_size = myDecoder.readInt();
		if (solider_size > 0) {
			for (var i = 0; i < solider_size; i++) {

				retObj.soliderUse[i] = {};
				retObj.soliderUse[i].arm = myDecoder.readInt();
				retObj.soliderUse[i].count = myDecoder.readInt();
			}
		}
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].id = myDecoder.readInt();
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				// retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].physical = myDecoder.readInt();
				retObj.cards[i].extra_props = [];
				let cardsi_extra_props_size = myDecoder.readInt();
				if (cardsi_extra_props_size > 0) {
					for (var extra_props_idx = 0; extra_props_idx < cardsi_extra_props_size; extra_props_idx++) {
						retObj.cards[i].extra_props[extra_props_idx] = myDecoder.readInt();
					}
				}

				retObj.cards[i].aptitude = [];
				let aptitude_size = myDecoder.readInt();
				if (aptitude_size > 0) {
					for (var aptitude_idx = 0; aptitude_idx < aptitude_size; aptitude_idx++) {
						retObj.cards[i].aptitude[aptitude_idx] = myDecoder.readInt();
					}
				}


				retObj.cards[i].skills_equips = [];
				let skills_equips_size = myDecoder.readInt();
				if (skills_equips_size > 0) {
					for (var skills_equips_idx = 0; skills_equips_idx < skills_equips_size; skills_equips_idx++) {
						var data = {
							id: myDecoder.readInt(),
							level: myDecoder.readInt(),
							type: myDecoder.readInt(),
						}
						retObj.cards[i].skills_equips[skills_equips_idx] = data;

					}
				}

				retObj.cards[i].rune_pack = [];
				let rune_pack_size = myDecoder.readInt();
				if (rune_pack_size > 0) {
					for (var rune_pack_idx = 0; rune_pack_idx < rune_pack_size; rune_pack_idx++) {
						retObj.cards[i].extra_props[rune_pack_idx] = myDecoder.readInt();
					}
				}

				retObj.cards[i].talents = [];
				retObj.cards[i].proficiency = [];
				let talentssize = myDecoder.readInt();
				if (talentssize > 0) {
					for (var talent_idx = 0; talent_idx < talentssize; talent_idx++) {
						retObj.cards[i].talents[talent_idx] = myDecoder.readInt();
						retObj.cards[i].proficiency[talent_idx] = myDecoder.readInt();
					}
				}

			}


		}
		let Att_base_info_exist = myDecoder.readBool();
		if (Att_base_info_exist == true) {
			retObj.att_base_info = {};
			retObj.att_base_info.id = myDecoder.readInt();
			retObj.att_base_info.nickname = myDecoder.readString();
			retObj.att_base_info.level = myDecoder.readInt();
			retObj.att_base_info.icon = myDecoder.readInt();
			retObj.att_base_info.head_frame_id = myDecoder.readInt();
			retObj.att_base_info.fight = myDecoder.readInt();
			retObj.att_base_info.cd_time = myDecoder.readInt();
		}
		let att_formation_exist = myDecoder.readBool();
		if (att_formation_exist == true) {
			retObj.att_formation = {};
			retObj.att_formation.fid = myDecoder.readInt();
			retObj.att_formation.formationId = myDecoder.readInt();
			retObj.att_formation.forward = myDecoder.readInt();
			retObj.att_formation.flip = myDecoder.readInt();
			retObj.att_formation.a = myDecoder.readInt();
			retObj.att_formation.b = myDecoder.readInt();
			retObj.att_formation.c = myDecoder.readInt();
			// retObj.formation.d = myDecoder.readInt();
			// retObj.formation.e = myDecoder.readInt();
			// retObj.formation.f = myDecoder.readInt();
			// retObj.formation.g = myDecoder.readInt();
			// retObj.formation.h = myDecoder.readInt();
			// retObj.formation.i = myDecoder.readInt();
			// retObj.formation.j = myDecoder.readInt();
		}

		/**已经在矿里的兵 */
		retObj.att_soliderUsed = []
		let att_bing_size = myDecoder.readInt();
		if (att_bing_size > 0) {
			for (var i = 0; i < att_bing_size; i++) {

				retObj.att_soliderUsed[i] = {};
				retObj.att_soliderUsed[i].arm = myDecoder.readInt();
				retObj.att_soliderUsed[i].count = myDecoder.readInt();
			}
		}
		retObj.att_cards = [];
		let att_cards_size = myDecoder.readInt();
		if (att_cards_size > 0) {
			for (var i = 0; i < att_cards_size; i++) {
				retObj.att_cards[i] = {};
				retObj.att_cards[i].id = myDecoder.readInt();
				retObj.att_cards[i].template_id = myDecoder.readInt();
				retObj.att_cards[i].level = myDecoder.readInt();
				retObj.att_cards[i].exp = myDecoder.readInt();
				retObj.att_cards[i].grade = myDecoder.readInt();
				retObj.att_cards[i].unitLevel = myDecoder.readInt();
				retObj.att_cards[i].unitGrade = myDecoder.readInt();
				// retObj.att_cards[i].unit_type = myDecoder.readInt();
				retObj.att_cards[i].maxhp = myDecoder.readInt();
				retObj.att_cards[i].atk = myDecoder.readInt();
				retObj.att_cards[i].def = myDecoder.readInt();
				retObj.att_cards[i].unitMaxhp = myDecoder.readInt();
				retObj.att_cards[i].unitAtk = myDecoder.readInt();
				retObj.att_cards[i].unitDef = myDecoder.readInt();
				retObj.att_cards[i].unitNum = myDecoder.readInt();
				retObj.att_cards[i].fight = myDecoder.readInt();
				retObj.att_cards[i].physical = myDecoder.readInt();
				retObj.att_cards[i].extra_props = [];
				let att_cardsi_extra_props_size = myDecoder.readInt();
				if (att_cardsi_extra_props_size > 0) {
					for (var att_extra_props_idx = 0; att_extra_props_idx < att_cardsi_extra_props_size; att_extra_props_idx++) {
						retObj.att_cards[i].extra_props[att_extra_props_idx] = myDecoder.readInt();
					}
				}
			}
		}
		retObj.exclude_cards = [];
		let exclude_cards_size = myDecoder.readInt();
		if (exclude_cards_size > 0) {
			for (var i = 0; i < exclude_cards_size; i++) {
				retObj.exclude_cards[i] = myDecoder.readInt();
			}
		}
		retObj.state = myDecoder.readInt();
		retObj.gains = myDecoder.readInt();
		retObj.rand_key = myDecoder.readLong();
		console.log(`矿场守卫信息`)
		return retObj;
	},

	/**请求恶魔之门防守  */
	send_C2SMineEviDetail: function (senderSocket, p_level_index, p_point_index, country) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3504);
		myEncoder.writeInt(p_level_index);
		myEncoder.writeInt(p_point_index);
		myEncoder.writeInt(country);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3505: function (myDecoder) {
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.point_index = myDecoder.readInt();
		let base_info_exist = myDecoder.readBool();
		if (base_info_exist == true) {
			retObj.base_info = {};
			retObj.base_info.id = myDecoder.readInt();
			retObj.base_info.nickname = myDecoder.readString();
			retObj.base_info.level = myDecoder.readInt();
			retObj.base_info.icon = myDecoder.readInt();
			retObj.base_info.head_frame_id = myDecoder.readInt();
			retObj.base_info.fight = myDecoder.readInt();
			retObj.base_info.cd_time = myDecoder.readInt();
		}
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			// retObj.formation.d = myDecoder.readInt();
			// retObj.formation.e = myDecoder.readInt();
			// retObj.formation.f = myDecoder.readInt();
			// retObj.formation.g = myDecoder.readInt();
			// retObj.formation.h = myDecoder.readInt();
			// retObj.formation.i = myDecoder.readInt();
			// retObj.formation.j = myDecoder.readInt();
		}

		/**已经在矿里的兵 */
		retObj.soliderUsed = []
		let bing_size = myDecoder.readInt();
		if (bing_size > 0) {
			for (var i = 0; i < bing_size; i++) {

				retObj.soliderUsed[i] = {};
				retObj.soliderUsed[i].arm = myDecoder.readInt();
				retObj.soliderUsed[i].count = myDecoder.readInt();
			}
		}

		/**可以往矿里调的兵 */
		retObj.soliderUse = []
		let solider_size = myDecoder.readInt();
		if (solider_size > 0) {
			for (var i = 0; i < solider_size; i++) {

				retObj.soliderUse[i] = {};
				retObj.soliderUse[i].arm = myDecoder.readInt();
				retObj.soliderUse[i].count = myDecoder.readInt();
			}
		}



		let Att_base_info_exist = myDecoder.readBool();
		if (Att_base_info_exist == true) {
			retObj.att_base_info = {};
			retObj.att_base_info.id = myDecoder.readInt();
			retObj.att_base_info.nickname = myDecoder.readString();
			retObj.att_base_info.level = myDecoder.readInt();
			retObj.att_base_info.icon = myDecoder.readInt();
			retObj.att_base_info.head_frame_id = myDecoder.readInt();
			retObj.att_base_info.fight = myDecoder.readInt();
			retObj.att_base_info.cd_time = myDecoder.readInt();
		}
		let att_formation_exist = myDecoder.readBool();
		if (att_formation_exist == true) {
			retObj.att_formation = {};
			retObj.att_formation.fid = myDecoder.readInt();
			retObj.att_formation.formationId = myDecoder.readInt();
			retObj.att_formation.forward = myDecoder.readInt();
			retObj.att_formation.flip = myDecoder.readInt();
			retObj.att_formation.a = myDecoder.readInt();
			retObj.att_formation.b = myDecoder.readInt();
			retObj.att_formation.c = myDecoder.readInt();
			// retObj.formation.d = myDecoder.readInt();
			// retObj.formation.e = myDecoder.readInt();
			// retObj.formation.f = myDecoder.readInt();
			// retObj.formation.g = myDecoder.readInt();
			// retObj.formation.h = myDecoder.readInt();
			// retObj.formation.i = myDecoder.readInt();
			// retObj.formation.j = myDecoder.readInt();
		}

		/**已经在矿里的兵 */
		retObj.att_soliderUsed = []
		let att_bing_size = myDecoder.readInt();
		if (att_bing_size > 0) {
			for (var i = 0; i < att_bing_size; i++) {

				retObj.att_soliderUsed[i] = {};
				retObj.att_soliderUsed[i].arm = myDecoder.readInt();
				retObj.att_soliderUsed[i].count = myDecoder.readInt();
			}
		}


		retObj.rand_key = myDecoder.readLong();
		console.log(`矿场守卫信息`)
		return retObj;
	},


	/**矿场战斗结果 type  0 是占领   1 掠夺   2  单挑  3 屠城 4 恶魔之门结算*/
	send_C2SMineBattleCalculate: function (senderSocket, p_level_index, p_point_index, p_result, p_rand_key, nation, type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3105);
		myEncoder.writeInt(p_level_index);
		myEncoder.writeInt(p_point_index);
		myEncoder.writeInt(p_result);
		myEncoder.writeLong(p_rand_key);
		myEncoder.writeInt(nation);
		myEncoder.writeInt(type);


		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3106: function (myDecoder) {
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.point_index = myDecoder.readInt();
		retObj.result = myDecoder.readInt();
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].itemId = myDecoder.readInt();
				retObj.gain[i].cnt = myDecoder.readInt();
			}
		}
		let mine_point_detail_exist = myDecoder.readBool();
		if (mine_point_detail_exist == true) {
			retObj.mine_point_detail = {};
			retObj.mine_point_detail.level_index = myDecoder.readInt();
			retObj.mine_point_detail.point_index = myDecoder.readInt();
			let mine_point_detail_base_info_exist = myDecoder.readBool();
			if (mine_point_detail_base_info_exist == true) {
				retObj.mine_point_detail.base_info = {};
				retObj.mine_point_detail.base_info.id = myDecoder.readInt();
				retObj.mine_point_detail.base_info.nickname = myDecoder.readString();
				retObj.mine_point_detail.base_info.level = myDecoder.readInt();
				retObj.mine_point_detail.base_info.icon = myDecoder.readInt();
				retObj.mine_point_detail.base_info.head_frame_id = myDecoder.readInt();
				retObj.mine_point_detail.base_info.fight = myDecoder.readInt();
				retObj.mine_point_detail.base_info.cd_time = myDecoder.readInt();
			}
			let mine_point_detail_formation_exist = myDecoder.readBool();
			if (mine_point_detail_formation_exist == true) {
				retObj.mine_point_detail.formation = {};
				retObj.mine_point_detail.formation.fid = myDecoder.readInt();
				retObj.mine_point_detail.formation.formationId = myDecoder.readInt();
				retObj.mine_point_detail.formation.forward = myDecoder.readInt();
				retObj.mine_point_detail.formation.flip = myDecoder.readInt();
				retObj.mine_point_detail.formation.a = myDecoder.readInt();
				retObj.mine_point_detail.formation.b = myDecoder.readInt();
				retObj.mine_point_detail.formation.c = myDecoder.readInt();
				retObj.mine_point_detail.formation.d = myDecoder.readInt();
				retObj.mine_point_detail.formation.e = myDecoder.readInt();
				retObj.mine_point_detail.formation.f = myDecoder.readInt();
				retObj.mine_point_detail.formation.g = myDecoder.readInt();
				retObj.mine_point_detail.formation.h = myDecoder.readInt();
				retObj.mine_point_detail.formation.i = myDecoder.readInt();
				retObj.mine_point_detail.formation.j = myDecoder.readInt();
			}
			retObj.mine_point_detail.cards = [];
			let mine_point_detail_cards_size = myDecoder.readInt();
			if (mine_point_detail_cards_size > 0) {
				for (var cards_idx = 0; cards_idx < mine_point_detail_cards_size; cards_idx++) {
					retObj.mine_point_detail.cards[cards_idx] = {};
					retObj.mine_point_detail.cards[cards_idx].template_id = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].level = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].exp = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].grade = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitLevel = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitGrade = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unit_type = myDecoder.readInt();

					retObj.mine_point_detail.cards[cards_idx].maxhp = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].atk = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].def = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitMaxhp = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitAtk = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitDef = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitNum = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].fight = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].extra_props = [];
					let mine_point_detail_cardscards_idx_extra_props_size = myDecoder.readInt();
					if (mine_point_detail_cardscards_idx_extra_props_size > 0) {
						for (var extra_props_idx = 0; extra_props_idx < mine_point_detail_cardscards_idx_extra_props_size; extra_props_idx++) {
							retObj.mine_point_detail.cards[cards_idx].extra_props[extra_props_idx] = myDecoder.readInt();
						}
					}
				}
			}
			retObj.mine_point_detail.exclude_cards = [];
			let mine_point_detail_exclude_cards_size = myDecoder.readInt();
			if (mine_point_detail_exclude_cards_size > 0) {
				for (var exclude_cards_idx = 0; exclude_cards_idx < mine_point_detail_exclude_cards_size; exclude_cards_idx++) {
					retObj.mine_point_detail.exclude_cards[exclude_cards_idx] = myDecoder.readInt();
				}
			}
			retObj.mine_point_detail.rand_key = myDecoder.readLong();
		}
		console.log(`战斗返回：` + JSON.stringify(retObj))
		return retObj;
	},

	get_3108: function (myDecoder) {
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.point_index = myDecoder.readInt();
		retObj.target_player_id = myDecoder.readInt();
		retObj.target_player_name = myDecoder.readString();
		retObj.loose_items = [];
		let loose_items_size = myDecoder.readInt();
		if (loose_items_size > 0) {
			for (var i = 0; i < loose_items_size; i++) {
				retObj.loose_items[i] = {};
				retObj.loose_items[i].itemId = myDecoder.readInt();
				retObj.loose_items[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	/**矿场奖励 */
	send_C2SMineGetAward: function (senderSocket, page, idx, country) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3109);
		myEncoder.writeInt(page);
		myEncoder.writeInt(idx);
		myEncoder.writeInt(country);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3110: function (myDecoder) {
		var retObj = {};
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].itemId = myDecoder.readInt();
				retObj.gain[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	/* */
	send_C2SMineHistory: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3111);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3112: function (myDecoder) {
		var retObj = {};
		retObj.records = [];
		let records_size = myDecoder.readInt();
		if (records_size > 0) {
			for (var i = 0; i < records_size; i++) {
				retObj.records[i] = {};
				retObj.records[i].target_player_id = myDecoder.readInt();
				retObj.records[i].target_player_name = myDecoder.readString();
				retObj.records[i].is_positive = myDecoder.readBool();
				retObj.records[i].is_success = myDecoder.readInt();
				retObj.records[i].mine_point = myDecoder.readInt();
				retObj.records[i].type = myDecoder.readInt();
				retObj.records[i].add_time = myDecoder.readInt();
				retObj.records[i].gain = [];
				let recordsi_gain_size = myDecoder.readInt();
				if (recordsi_gain_size > 0) {
					for (var gain_idx = 0; gain_idx < recordsi_gain_size; gain_idx++) {
						retObj.records[i].gain[gain_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	/**我的矿场防守阵型  eviType 恶魔之门 0 防守 1进攻 */
	/**我的矿场防守阵型  eviType 恶魔之门 0 防守 1进攻 */
	send_C2SMineDefFormationSave: function (senderSocket, p_level_index, p_point_index, p_formation, country, type, eviType) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3113);
		myEncoder.writeInt(p_level_index);
		myEncoder.writeInt(p_point_index);
		myEncoder.writeInt(country);
		myEncoder.writeInt(type);
		myEncoder.writeInt(eviType);

		if (p_formation == null) {
			myEncoder.writeBool(false);
		} else {
			myEncoder.writeBool(true);
			myEncoder.writeInt(p_formation.fid);
			myEncoder.writeInt(p_formation.formationId);
			myEncoder.writeInt(p_formation.forward);
			myEncoder.writeInt(p_formation.flip);
			myEncoder.writeInt(p_formation.a);
			myEncoder.writeInt(p_formation.b);
			myEncoder.writeInt(p_formation.c);
			myEncoder.writeInt(p_formation.d);
			myEncoder.writeInt(p_formation.e);
			myEncoder.writeInt(p_formation.f);
			myEncoder.writeInt(p_formation.g);
			myEncoder.writeInt(p_formation.h);
			myEncoder.writeInt(p_formation.i);
			myEncoder.writeInt(p_formation.j);
			// debugger;
			// myEncoder.writeInt(soldier.length);
			myEncoder.writeInt(p_formation.soldier.length)//派兵是数据

			for (var i = 0; i < p_formation.soldier.length; i++) {
				myEncoder.writeInt(p_formation.soldier[i].arm);
				myEncoder.writeInt(p_formation.soldier[i].count);
			}

		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3114: function (myDecoder) {
		var retObj = {};
		let mine_point_detail_exist = myDecoder.readBool();
		if (mine_point_detail_exist == true) {
			retObj.mine_point_detail = {};
			retObj.mine_point_detail.level_index = myDecoder.readInt();
			retObj.mine_point_detail.point_index = myDecoder.readInt();
			let mine_point_detail_base_info_exist = myDecoder.readBool();
			if (mine_point_detail_base_info_exist == true) {
				retObj.mine_point_detail.base_info = {};
				retObj.mine_point_detail.base_info.id = myDecoder.readInt();
				retObj.mine_point_detail.base_info.nickname = myDecoder.readString();
				retObj.mine_point_detail.base_info.level = myDecoder.readInt();
				retObj.mine_point_detail.base_info.icon = myDecoder.readInt();
				retObj.mine_point_detail.base_info.head_frame_id = myDecoder.readInt();
				retObj.mine_point_detail.base_info.fight = myDecoder.readInt();
				retObj.mine_point_detail.base_info.cd_time = myDecoder.readInt();
			}
			let mine_point_detail_formation_exist = myDecoder.readBool();
			if (mine_point_detail_formation_exist == true) {
				retObj.mine_point_detail.formation = {};
				retObj.mine_point_detail.formation.fid = myDecoder.readInt();
				retObj.mine_point_detail.formation.formationId = myDecoder.readInt();
				retObj.mine_point_detail.formation.forward = myDecoder.readInt();
				retObj.mine_point_detail.formation.flip = myDecoder.readInt();
				retObj.mine_point_detail.formation.a = myDecoder.readInt();
				retObj.mine_point_detail.formation.b = myDecoder.readInt();
				retObj.mine_point_detail.formation.c = myDecoder.readInt();
				retObj.mine_point_detail.formation.d = myDecoder.readInt();
				retObj.mine_point_detail.formation.e = myDecoder.readInt();
				retObj.mine_point_detail.formation.f = myDecoder.readInt();
				retObj.mine_point_detail.formation.g = myDecoder.readInt();
				retObj.mine_point_detail.formation.h = myDecoder.readInt();
				retObj.mine_point_detail.formation.i = myDecoder.readInt();
				retObj.mine_point_detail.formation.j = myDecoder.readInt();
			}
			retObj.mine_point_detail.cards = [];
			let mine_point_detail_cards_size = myDecoder.readInt();
			if (mine_point_detail_cards_size > 0) {
				for (var cards_idx = 0; cards_idx < mine_point_detail_cards_size; cards_idx++) {
					retObj.mine_point_detail.cards[cards_idx] = {};
					retObj.mine_point_detail.cards[cards_idx].template_id = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].level = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].exp = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].grade = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitLevel = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitGrade = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unit_type = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].maxhp = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].atk = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].def = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitMaxhp = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitAtk = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitDef = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].unitNum = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].fight = myDecoder.readInt();
					retObj.mine_point_detail.cards[cards_idx].extra_props = [];
					let mine_point_detail_cardscards_idx_extra_props_size = myDecoder.readInt();
					if (mine_point_detail_cardscards_idx_extra_props_size > 0) {
						for (var extra_props_idx = 0; extra_props_idx < mine_point_detail_cardscards_idx_extra_props_size; extra_props_idx++) {
							retObj.mine_point_detail.cards[cards_idx].extra_props[extra_props_idx] = myDecoder.readInt();
						}
					}
				}
			}
			retObj.mine_point_detail.exclude_cards = [];
			let mine_point_detail_exclude_cards_size = myDecoder.readInt();
			if (mine_point_detail_exclude_cards_size > 0) {
				for (var exclude_cards_idx = 0; exclude_cards_idx < mine_point_detail_exclude_cards_size; exclude_cards_idx++) {
					retObj.mine_point_detail.exclude_cards[exclude_cards_idx] = myDecoder.readInt();
				}
			}
			retObj.mine_point_detail.rand_key = myDecoder.readLong();
		}
		return retObj;
	},

	send_C2SBlackMarketInfo: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4401);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4402: function (myDecoder) {
		var retObj = {};
		retObj.refreshTimestamp = myDecoder.readInt();
		retObj.refreshTimes = myDecoder.readInt();
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].itemTemplateId = myDecoder.readInt();
				retObj.items[i].num = myDecoder.readInt();
				retObj.items[i].price = myDecoder.readInt();
				retObj.items[i].is_buy = myDecoder.readBool();
			}
		}
		return retObj;
	},

	send_C2SBlackMarketBuy: function (senderSocket, p_slot_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4403);
		myEncoder.writeInt(p_slot_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4404: function (myDecoder) {
		var retObj = {};
		retObj.slot_index = myDecoder.readInt();
		let gain_exist = myDecoder.readBool();
		if (gain_exist == true) {
			retObj.gain = {};
			retObj.gain.item_template_id = myDecoder.readInt();
			retObj.gain.item_count = myDecoder.readInt();
		}
		return retObj;
	},

	send_C2SBlackMarketRefresh: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4405);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4406: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SBossView: function (senderSocket, p_level_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3351);
		myEncoder.writeInt(p_level_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3352: function (myDecoder) {
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.my_level_index = myDecoder.readInt();
		retObj.my_rank = myDecoder.readInt();
		retObj.my_damage_sum = myDecoder.readLong();
		retObj.top_rank_list = [];
		let top_rank_list_size = myDecoder.readInt();
		if (top_rank_list_size > 0) {
			for (var i = 0; i < top_rank_list_size; i++) {
				retObj.top_rank_list[i] = {};
				retObj.top_rank_list[i].playerId = myDecoder.readInt();
				retObj.top_rank_list[i].nickname = myDecoder.readString();
				retObj.top_rank_list[i].icon = myDecoder.readInt();
				retObj.top_rank_list[i].head_frame = myDecoder.readInt();
				retObj.top_rank_list[i].level = myDecoder.readInt();
				retObj.top_rank_list[i].fight = myDecoder.readInt();
				retObj.top_rank_list[i].vipLevel = myDecoder.readInt();
				retObj.top_rank_list[i].damage_val = myDecoder.readLong();
			}
		}
		retObj.boss_hp = myDecoder.readInt();
		retObj.is_in_battle = myDecoder.readBool();
		retObj.battle_cd_time = myDecoder.readInt();
		retObj.attack_count = myDecoder.readInt();
		retObj.damage_reward_get = myDecoder.readBool();
		retObj.rank_reward_get = myDecoder.readBool();
		retObj.is_buff = myDecoder.readBool();
		return retObj;
	},

	send_C2SBossHurt: function (senderSocket, p_hurt_val, p_r) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3353);
		myEncoder.writeInt(p_hurt_val);
		myEncoder.writeLong(p_r);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3354: function (myDecoder) {
		var retObj = {};
		retObj.hurt_val = myDecoder.readInt();
		retObj.boss_hp = myDecoder.readInt();
		return retObj;
	},

	send_C2SBossGetAward: function (senderSocket, p_type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3355);
		myEncoder.writeInt(p_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3356: function (myDecoder) {
		var retObj = {};
		retObj.type = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SBossBattleStart: function (senderSocket, p_level_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3357);
		myEncoder.writeInt(p_level_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3358: function (myDecoder) {
		var retObj = {};
		retObj.level_index = myDecoder.readInt();
		retObj.r = myDecoder.readLong();
		return retObj;
	},

	get_3360: function (myDecoder) {
		var retObj = {};
		retObj.status = myDecoder.readInt();
		retObj.level_index = myDecoder.readInt();
		retObj.is_by_damage = myDecoder.readBool();
		return retObj;
	},

	send_C2SBossGuwu: function (senderSocket, p_level_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3361);
		myEncoder.writeInt(p_level_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3362: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SCardList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2001);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	//获取英雄列表
	//获取英雄列表
	get_2002: function (myDecoder) {
		var retObj = {};
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {

				retObj.cards[i] = {};
				retObj.cards[i].id = myDecoder.readInt();
				retObj.cards[i].template_id = myDecoder.readInt();//魔板ID
				retObj.cards[i].level = myDecoder.readInt();//
				retObj.cards[i].num = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();//经验
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unit_level = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].physical = myDecoder.readInt();
				retObj.cards[i].equips = [];
				let cardsi_equips_size = myDecoder.readInt();
				if (cardsi_equips_size > 0) {
					for (var equips_idx = 0; equips_idx < cardsi_equips_size; equips_idx++) {
						retObj.cards[i].equips[equips_idx] = myDecoder.readString();
					}
				}
				retObj.cards[i].unitEquips = [];
				let cardsi_unitEquips_size = myDecoder.readInt();
				if (cardsi_unitEquips_size > 0) {
					for (var unitEquips_idx = 0; unitEquips_idx < cardsi_unitEquips_size; unitEquips_idx++) {
						retObj.cards[i].unitEquips[unitEquips_idx] = myDecoder.readInt();
					}
				}

				retObj.cards[i].runeUnlock = [];
				let cardsi_runeUnlock_size = myDecoder.readInt();
				if (cardsi_runeUnlock_size > 0) {
					for (var runeUnlock_idx = 0; runeUnlock_idx < cardsi_runeUnlock_size; runeUnlock_idx++) {
						retObj.cards[i].runeUnlock[runeUnlock_idx] = myDecoder.readInt();
					}
				}
				retObj.cards[i].runePutup = [];
				let cardsi_runePutup_size = myDecoder.readInt();
				if (cardsi_runePutup_size > 0) {
					for (var runePutup_idx = 0; runePutup_idx < cardsi_runePutup_size; runePutup_idx++) {
						retObj.cards[i].runePutup[runePutup_idx] = myDecoder.readInt();
					}
				}
				retObj.cards[i].runeLevel = [];
				let cardsi_runeLevel_size = myDecoder.readInt();
				if (cardsi_runeLevel_size > 0) {
					for (var runeLevel_idx = 0; runeLevel_idx < cardsi_runeLevel_size; runeLevel_idx++) {
						retObj.cards[i].runeLevel[runeLevel_idx] = myDecoder.readInt();
					}
				}
				retObj.cards[i].skills_equips = [];
				let skills_equips_size = myDecoder.readInt();
				if (skills_equips_size > 0) {
					for (var skills_equips_idx = 0; skills_equips_idx < skills_equips_size; skills_equips_idx++) {
						// retObj.cards[i].skills_equips[skills_equips_idx].id = myDecoder.readInt();


						// retObj.cards[i].skills_equips[skills_equips_idx].level = myDecoder.readInt();
						// retObj.cards[i].skills_equips[skills_equips_idx].type = myDecoder.readInt();

						var data = {
							id: myDecoder.readInt(),
							level: myDecoder.readInt(),
							type: myDecoder.readInt()
						};
						retObj.cards[i].skills_equips[skills_equips_idx] = data
					}
				}
				retObj.cards[i].proficiency = [];  //熟练度 最多三个 对应英雄json 里 熟练兵种
				retObj.cards[i].talents = [];
				let proficiency_size = myDecoder.readInt();
				if (proficiency_size > 0) {
					for (var proficiency_id = 0; proficiency_id < proficiency_size; proficiency_id++) {
						retObj.cards[i].proficiency[proficiency_id] = myDecoder.readInt();
						retObj.cards[i].talents[proficiency_id] = myDecoder.readInt();
					}
				}




				retObj.cards[i].aptitude = [];  //对应的 资质
				let aptitude_size = myDecoder.readInt();
				if (aptitude_size > 0) {
					for (var aptitude_id = 0; aptitude_id < aptitude_size; aptitude_id++) {
						retObj.cards[i].aptitude[aptitude_id] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	get_2004: function (myDecoder) {
		var retObj = {};
		let card_info_exist = myDecoder.readBool();
		if (card_info_exist == true) {
			// debugger;
			retObj.card_info = {};
			retObj.card_info.id = myDecoder.readInt();
			retObj.card_info.template_id = myDecoder.readInt();
			retObj.card_info.level = myDecoder.readInt();
			retObj.card_info.num = myDecoder.readInt();
			retObj.card_info.exp = myDecoder.readInt();
			retObj.card_info.grade = myDecoder.readInt();
			retObj.card_info.unit_level = myDecoder.readInt();
			retObj.card_info.unitGrade = myDecoder.readInt();
			retObj.card_info.equips = [];

			var card_info_equips_size = myDecoder.readInt();
			if (card_info_equips_size > 0) {
				for (var equips_idx = 0; equips_idx < card_info_equips_size; equips_idx++) {
					retObj.card_info.equips[equips_idx] = myDecoder.readString();
				}
			}
			retObj.card_info.unitEquips = [];
			let card_info_unitEquips_size = myDecoder.readInt();
			if (card_info_unitEquips_size > 0) {
				for (var unitEquips_idx = 0; unitEquips_idx < card_info_unitEquips_size; unitEquips_idx++) {
					retObj.card_info.unitEquips[unitEquips_idx] = myDecoder.readInt();
				}
			}
			retObj.card_info.fight = myDecoder.readInt();
			retObj.card_info.physical = myDecoder.readInt();
			retObj.card_info.runeUnlock = [];
			let card_info_runeUnlock_size = myDecoder.readInt();
			if (card_info_runeUnlock_size > 0) {
				for (var runeUnlock_idx = 0; runeUnlock_idx < card_info_runeUnlock_size; runeUnlock_idx++) {
					retObj.card_info.runeUnlock[runeUnlock_idx] = myDecoder.readInt();
				}
			}
			retObj.card_info.runePutup = [];
			let card_info_runePutup_size = myDecoder.readInt();
			if (card_info_runePutup_size > 0) {
				for (var runePutup_idx = 0; runePutup_idx < card_info_runePutup_size; runePutup_idx++) {
					retObj.card_info.runePutup[runePutup_idx] = myDecoder.readInt();
				}
			}
			retObj.card_info.runeLevel = [];
			let card_info_runeLevel_size = myDecoder.readInt();
			if (card_info_runeLevel_size > 0) {
				for (var runeLevel_idx = 0; runeLevel_idx < card_info_runeLevel_size; runeLevel_idx++) {
					retObj.card_info.runeLevel[runeLevel_idx] = myDecoder.readInt();
				}
			}
			// retObj.card_info.skills_equips = [];
			// let card_skills_equips_size = myDecoder.readInt();
			// if (card_skills_equips_size > 0) {
			// 	for (var skills_equips_idx = 0; skills_equips_idx < card_skills_equips_size; skills_equips_idx++) {
			// 		retObj.card_info.skills_equips[skills_equips_idx] = myDecoder.readInt();
			// 	}
			// }

			retObj.card_info.skills_equips = [];
			let card_skills_equips_size = myDecoder.readInt();
			if (card_skills_equips_size > 0) {
				for (var skills_equips_idx = 0; skills_equips_idx < card_skills_equips_size; skills_equips_idx++) {
					var data = {
						id: myDecoder.readInt(),
						level: myDecoder.readInt(),
						type: myDecoder.readInt()
					};

					retObj.card_info.skills_equips[skills_equips_idx] = data;
				}
			}


			retObj.card_info.proficiency = [];
			retObj.card_info.talents = [];

			let card_proficiency_size = myDecoder.readInt();
			if (card_proficiency_size > 0) {
				for (var proficiency_idx = 0; proficiency_idx < card_proficiency_size; proficiency_idx++) {
					retObj.card_info.proficiency[proficiency_idx] = myDecoder.readInt();
					retObj.card_info.talents[proficiency_idx] = myDecoder.readInt();
				}
			}
			retObj.card_info.aptitude = [];
			let aptitude_size = myDecoder.readInt();
			if (aptitude_size > 0) {
				for (var aptitude_idx = 0; aptitude_idx < aptitude_size; aptitude_idx++) {
					retObj.card_info.aptitude[aptitude_idx] = myDecoder.readInt();
				}
			}

		}
		return retObj;
	},
	/**装备安装 */
	send_C2SCardTakeOnItem: function (senderSocket, p_cardId, p_item_uuid) {
		console.log(p_cardId, p_item_uuid)
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2005);
		myEncoder.writeInt(p_cardId);
		myEncoder.writeString(p_item_uuid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2006: function (myDecoder) {
		var retObj = {};
		retObj.cardId = myDecoder.readInt();
		retObj.item_uuid = myDecoder.readString();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	/**装备卸载  */
	send_C2SCardTakeOffItem: function (senderSocket, p_cardId, p_position) {
		console.log(p_cardId, p_position)
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2007);
		myEncoder.writeInt(p_cardId);
		myEncoder.writeInt(p_position);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2008: function (myDecoder) {
		var retObj = {};
		retObj.cardId = myDecoder.readInt();
		retObj.position = myDecoder.readInt();
		retObj.item_uuid = myDecoder.readString();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	/**装备升级 */
	send_C2SCardAddLevel: function (senderSocket, p_card_id, p_cost_cards, p_cost_items, type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2009);
		myEncoder.writeInt(p_card_id);
		if (p_cost_cards == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_cost_cards.length);
			p_cost_cards.forEach(function (p_cost_cards_v) {
				myEncoder.writeInt(p_cost_cards_v.id);
				myEncoder.writeInt(p_cost_cards_v.count);
			});
		}
		if (p_cost_items == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_cost_items.length);
			p_cost_items.forEach(function (p_cost_items_v) {
				myEncoder.writeInt(p_cost_items_v.id);
				myEncoder.writeInt(p_cost_items_v.count);
			});
		}
		myEncoder.writeInt(type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2010: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.level = myDecoder.readInt();
		retObj.type = myDecoder.readInt();
		retObj.a = []

		// debugger;
		if (retObj.type != 0) {

			for (var i = 0; i < 3; i++) {
				retObj.a[i] = myDecoder.readInt();
			}
		}
		else {
			retObj.level_exp = myDecoder.readInt();
		}

		return retObj;
	},
	/**装备升级星 */
	send_C2SCardAddStar: function (senderSocket, p_card_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2011);
		myEncoder.writeInt(p_card_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2012: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.new_star = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		retObj.num = myDecoder.readInt();
		return retObj;
	},

	/**练兵 */
	send_C2SCardTrain: function (senderSocket, p_card_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2013);
		myEncoder.writeInt(p_card_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2014: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.itemNum = myDecoder.readInt();
		retObj.unit_level = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SCardAutoTrain: function (senderSocket, p_card_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2015);
		myEncoder.writeInt(p_card_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2016: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.itemNum = myDecoder.readInt();
		retObj.unit_level = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SCardUpgradeUnit: function (senderSocket, p_card_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2017);
		myEncoder.writeInt(p_card_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2018: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.unit_grade = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SCardCompose: function (senderSocket, p_frag_templateId) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2019);
		myEncoder.writeInt(p_frag_templateId);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2020: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SCardEquipUnit: function (senderSocket, p_card_id, p_unit_position) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2021);
		myEncoder.writeInt(p_card_id);
		myEncoder.writeInt(p_unit_position);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2022: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.unit_position = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	get_2024: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.level = myDecoder.readInt();
		retObj.level_exp = myDecoder.readInt();
		retObj.new_fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SRuneUnlock: function (senderSocket, p_card_id, p_pos_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2025);
		myEncoder.writeInt(p_card_id);
		myEncoder.writeInt(p_pos_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2026: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.pos_index = myDecoder.readInt();
		console.log(`解锁符槽返回：` + JSON.stringify(retObj))
		return retObj;
	},

	send_C2SRunePutup: function (senderSocket, p_card_id, p_pos_index, p_rune_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2027);
		myEncoder.writeInt(p_card_id);
		myEncoder.writeInt(p_pos_index);
		myEncoder.writeInt(p_rune_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2028: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.pos_index = myDecoder.readInt();
		retObj.rune_id = myDecoder.readInt();
		retObj.rune_level = myDecoder.readInt();
		retObj.back_items = [];
		let back_items_size = myDecoder.readInt();
		if (back_items_size > 0) {
			for (var i = 0; i < back_items_size; i++) {
				retObj.back_items[i] = {};
				retObj.back_items[i].template_id = myDecoder.readInt();
				retObj.back_items[i].count = myDecoder.readInt();
			}
		}
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SItemBuy: function (senderSocket, p_template_id, p_buy_num) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2029);
		myEncoder.writeInt(p_template_id);
		myEncoder.writeInt(p_buy_num);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2030: function (myDecoder) {
		var retObj = {};
		retObj.template_id = myDecoder.readInt();
		retObj.cur_size = myDecoder.readInt();
		return retObj;
	},

	send_C2SRuneCombine: function (senderSocket, p_target_quality, p_bless_items, p_rune_items) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2031);
		myEncoder.writeInt(p_target_quality);
		if (p_bless_items == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_bless_items.length);
			p_bless_items.forEach(function (p_bless_items_v) {
				myEncoder.writeInt(p_bless_items_v.template_id);
				myEncoder.writeInt(p_bless_items_v.count);
			});
		}
		if (p_rune_items == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_rune_items.length);
			p_rune_items.forEach(function (p_rune_items_v) {
				myEncoder.writeInt(p_rune_items_v.template_id);
				myEncoder.writeInt(p_rune_items_v.count);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2032: function (myDecoder) {
		var retObj = {};
		retObj.is_success = myDecoder.readBool();
		retObj.new_rune_id = myDecoder.readInt();
		retObj.back_items = [];
		let back_items_size = myDecoder.readInt();
		if (back_items_size > 0) {
			for (var i = 0; i < back_items_size; i++) {
				retObj.back_items[i] = {};
				retObj.back_items[i].template_id = myDecoder.readInt();
				retObj.back_items[i].count = myDecoder.readInt();
			}
		}
		retObj.success_rate = myDecoder.readInt();
		return retObj;
	},

	send_C2SRuneLevelup: function (senderSocket, p_card_id, p_rune_pos_index, p_cost_runes) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2033);
		myEncoder.writeInt(p_card_id);
		myEncoder.writeInt(p_rune_pos_index);
		if (p_cost_runes == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_cost_runes.length);
			p_cost_runes.forEach(function (p_cost_runes_v) {
				myEncoder.writeInt(p_cost_runes_v.template_id);
				myEncoder.writeInt(p_cost_runes_v.count);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2034: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.rune_pos_index = myDecoder.readInt();
		retObj.rune_level = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		return retObj;
	},

	send_C2SChat: function (senderSocket, p_chat_type, p_target_uid, p_content) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10401);
		myEncoder.writeInt(p_chat_type);
		myEncoder.writeInt(p_target_uid);
		myEncoder.writeString(p_content);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10402: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	get_10404: function (myDecoder) {
		var retObj = {};
		retObj.sender_uid = myDecoder.readInt();
		retObj.sender_name = myDecoder.readString();
		retObj.icon = myDecoder.readInt();
		retObj.head_frame_id = myDecoder.readInt();
		retObj.level = myDecoder.readInt();
		retObj.vip_level = myDecoder.readInt();
		retObj.office_index = myDecoder.readInt();
		retObj.content = myDecoder.readString();
		retObj.chat_type = myDecoder.readInt();
		retObj.timestamp = myDecoder.readInt();
		retObj.receiver_name = myDecoder.readString();
		return retObj;
	},

	send_C2SChatView: function (senderSocket, p_chat_type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10405);
		myEncoder.writeInt(p_chat_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10406: function (myDecoder) {
		var retObj = {};
		retObj.chat_type = myDecoder.readInt();
		retObj.chat_content = [];
		let chat_content_size = myDecoder.readInt();
		if (chat_content_size > 0) {
			for (var i = 0; i < chat_content_size; i++) {
				retObj.chat_content[i] = {};
				retObj.chat_content[i].sender_uid = myDecoder.readInt();
				retObj.chat_content[i].sender_name = myDecoder.readString();
				retObj.chat_content[i].icon = myDecoder.readInt();
				retObj.chat_content[i].head_frame_id = myDecoder.readInt();
				retObj.chat_content[i].level = myDecoder.readInt();
				retObj.chat_content[i].vip_level = myDecoder.readInt();
				retObj.chat_content[i].office_index = myDecoder.readInt();
				retObj.chat_content[i].content = myDecoder.readString();
				retObj.chat_content[i].chat_type = myDecoder.readInt();
				retObj.chat_content[i].timestamp = myDecoder.readInt();
				retObj.chat_content[i].receiver_name = myDecoder.readString();
			}
		}
		retObj.new_msg_list = [];
		let new_msg_list_size = myDecoder.readInt();
		if (new_msg_list_size > 0) {
			for (var i = 0; i < new_msg_list_size; i++) {
				retObj.new_msg_list[i] = myDecoder.readBool();
			}
		}
		return retObj;
	},

	send_C2SChatVisit: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10407);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10408: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SDailyMissionList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3401);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3402: function (myDecoder) {
		var retObj = {};
		retObj.missions = [];
		let missions_size = myDecoder.readInt();
		if (missions_size > 0) {
			for (var i = 0; i < missions_size; i++) {
				retObj.missions[i] = {};
				retObj.missions[i].mission_tpl_id = myDecoder.readInt();
				retObj.missions[i].progress = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SDailyMissionGetAward: function (senderSocket, p_mission_tpl_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3403);
		myEncoder.writeInt(p_mission_tpl_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3404: function (myDecoder) {
		var retObj = {};
		retObj.mission_tpl_id = myDecoder.readInt();
		return retObj;
	},

	get_3406: function (myDecoder) {
		var retObj = {};
		retObj.mission_tpl_id = myDecoder.readInt();
		retObj.progress = myDecoder.readInt();
		return retObj;
	},

	send_C2SDailyMissionGetAwardAll: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3407);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3408: function (myDecoder) {
		var retObj = {};
		retObj.attachs = [];
		let attachs_size = myDecoder.readInt();
		if (attachs_size > 0) {
			for (var i = 0; i < attachs_size; i++) {
				retObj.attachs[i] = {};
				retObj.attachs[i].itemId = myDecoder.readInt();
				retObj.attachs[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SForge: function (senderSocket, p_heros, p_treasures, p_equips) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4601);
		if (p_heros == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_heros.length);
			p_heros.forEach(function (p_heros_v) {
				myEncoder.writeInt(p_heros_v.cardTemplateId);
				myEncoder.writeString(p_heros_v.treasure_uuid);
				myEncoder.writeInt(p_heros_v.count);
			});
		}
		if (p_treasures == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_treasures.length);
			p_treasures.forEach(function (p_treasures_v) {
				myEncoder.writeInt(p_treasures_v.cardTemplateId);
				myEncoder.writeString(p_treasures_v.treasure_uuid);
				myEncoder.writeInt(p_treasures_v.count);
			});
		}
		if (p_equips == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_equips.length);
			p_equips.forEach(function (p_equips_v) {
				myEncoder.writeInt(p_equips_v.cardTemplateId);
				myEncoder.writeString(p_equips_v.treasure_uuid);
				myEncoder.writeInt(p_equips_v.count);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4602: function (myDecoder) {
		var retObj = {};
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].item_template_id = myDecoder.readInt();
				retObj.gain[i].item_count = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SEquipCompose: function (senderSocket, p_items, p_guideReq) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4603);
		if (p_items == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_items.length);
			p_items.forEach(function (p_items_v) {
				myEncoder.writeString(p_items_v);
			});
		}
		myEncoder.writeBool(p_guideReq);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4604: function (myDecoder) {
		var retObj = {};
		let gain_exist = myDecoder.readBool();
		if (gain_exist == true) {
			retObj.gain = {};
			retObj.gain.item_template_id = myDecoder.readInt();
			retObj.gain.item_count = myDecoder.readInt();
		}
		retObj.gainGameMoney = [];
		let gainGameMoney_size = myDecoder.readInt();
		if (gainGameMoney_size > 0) {
			for (var i = 0; i < gainGameMoney_size; i++) {
				retObj.gainGameMoney[i] = myDecoder.readInt();
			}
		}
		retObj.costItems = [];
		let costItems_size = myDecoder.readInt();
		if (costItems_size > 0) {
			for (var i = 0; i < costItems_size; i++) {
				retObj.costItems[i] = myDecoder.readString();
			}
		}
		retObj.keepItems = [];
		let keepItems_size = myDecoder.readInt();
		if (keepItems_size > 0) {
			for (var i = 0; i < keepItems_size; i++) {
				retObj.keepItems[i] = myDecoder.readString();
			}
		}
		retObj.guideReq = myDecoder.readBool();
		return retObj;
	},

	send_C2SRuneSuccessRate: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4605);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4606: function (myDecoder) {
		var retObj = {};
		retObj.success_rate = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuozhanView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3451);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3452: function (myDecoder) {
		var retObj = {};
		retObj.pass_city_index = [];
		let pass_city_index_size = myDecoder.readInt();
		if (pass_city_index_size > 0) {
			for (var i = 0; i < pass_city_index_size; i++) {
				retObj.pass_city_index[i] = myDecoder.readInt();
			}
		}
		retObj.player_city_index = myDecoder.readInt();
		retObj.my_nation = myDecoder.readInt();
		retObj.change_nation_cd = myDecoder.readInt();
		retObj.my_office = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuozhanBattleStart: function (senderSocket, p_city_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3453);
		myEncoder.writeInt(p_city_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3454: function (myDecoder) {
		var retObj = {};
		retObj.city_index = myDecoder.readInt();
		retObj.ret = myDecoder.readInt();
		retObj.r = myDecoder.readLong();
		retObj.enemy_level = myDecoder.readInt();
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].extra_props = [];
				let cardsi_extra_props_size = myDecoder.readInt();
				if (cardsi_extra_props_size > 0) {
					for (var extra_props_idx = 0; extra_props_idx < cardsi_extra_props_size; extra_props_idx++) {
						retObj.cards[i].extra_props[extra_props_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SGuozhanBattleEnd: function (senderSocket, p_city_index, p_ret, p_r) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3455);
		myEncoder.writeInt(p_city_index);
		myEncoder.writeInt(p_ret);
		myEncoder.writeLong(p_r);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3456: function (myDecoder) {
		var retObj = {};
		retObj.city_index = myDecoder.readInt();
		retObj.ret = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGuozhanMove: function (senderSocket, p_city_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3457);
		myEncoder.writeInt(p_city_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3458: function (myDecoder) {
		var retObj = {};
		retObj.city_index = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuozhanChangeNation: function (senderSocket, p_target_nation) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3459);
		myEncoder.writeInt(p_target_nation);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3460: function (myDecoder) {
		var retObj = {};
		retObj.old_nation = myDecoder.readInt();
		retObj.target_nation = myDecoder.readInt();
		retObj.change_nation_cd = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuozhanOfficeView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3461);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3462: function (myDecoder) {
		var retObj = {};
		retObj.player_list = [];
		let player_list_size = myDecoder.readInt();
		if (player_list_size > 0) {
			for (var i = 0; i < player_list_size; i++) {
				retObj.player_list[i] = {};
				retObj.player_list[i].office_index = myDecoder.readInt();
				retObj.player_list[i].id = myDecoder.readInt();
				retObj.player_list[i].nickname = myDecoder.readString();
				retObj.player_list[i].level = myDecoder.readInt();
				retObj.player_list[i].icon = myDecoder.readInt();
				retObj.player_list[i].head_frame_id = myDecoder.readInt();
				retObj.player_list[i].fight = myDecoder.readInt();
				retObj.player_list[i].hp_perc = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGuozhanOfficeDetail: function (senderSocket, p_office_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3463);
		myEncoder.writeInt(p_office_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3464: function (myDecoder) {
		var retObj = {};
		retObj.office_index = myDecoder.readInt();
		let base_info_exist = myDecoder.readBool();
		if (base_info_exist == true) {
			retObj.base_info = {};
			retObj.base_info.office_index = myDecoder.readInt();
			retObj.base_info.id = myDecoder.readInt();
			retObj.base_info.nickname = myDecoder.readString();
			retObj.base_info.level = myDecoder.readInt();
			retObj.base_info.icon = myDecoder.readInt();
			retObj.base_info.head_frame_id = myDecoder.readInt();
			retObj.base_info.fight = myDecoder.readInt();
			retObj.base_info.hp_perc = myDecoder.readInt();
		}
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
				retObj.cards[i].extra_props = [];
				let cardsi_extra_props_size = myDecoder.readInt();
				if (cardsi_extra_props_size > 0) {
					for (var extra_props_idx = 0; extra_props_idx < cardsi_extra_props_size; extra_props_idx++) {
						retObj.cards[i].extra_props[extra_props_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SGuozhanOfficeStart: function (senderSocket, p_office_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3465);
		myEncoder.writeInt(p_office_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3466: function (myDecoder) {
		var retObj = {};
		retObj.office_index = myDecoder.readInt();
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2SGuozhanOfficCalculate: function (senderSocket, p_office_index, p_result, p_rand_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3467);
		myEncoder.writeInt(p_office_index);
		myEncoder.writeInt(p_result);
		myEncoder.writeLong(p_rand_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3468: function (myDecoder) {
		var retObj = {};
		retObj.office_index = myDecoder.readInt();
		retObj.ret = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		retObj.player_list = [];
		let player_list_size = myDecoder.readInt();
		if (player_list_size > 0) {
			for (var i = 0; i < player_list_size; i++) {
				retObj.player_list[i] = {};
				retObj.player_list[i].office_index = myDecoder.readInt();
				retObj.player_list[i].id = myDecoder.readInt();
				retObj.player_list[i].nickname = myDecoder.readString();
				retObj.player_list[i].level = myDecoder.readInt();
				retObj.player_list[i].icon = myDecoder.readInt();
				retObj.player_list[i].head_frame_id = myDecoder.readInt();
				retObj.player_list[i].fight = myDecoder.readInt();
				retObj.player_list[i].hp_perc = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGuozhanFightView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3471);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3472: function (myDecoder) {
		var retObj = {};
		retObj.city_list = [];
		let city_list_size = myDecoder.readInt();
		if (city_list_size > 0) {
			for (var i = 0; i < city_list_size; i++) {
				retObj.city_list[i] = {};
				retObj.city_list[i].player_name = myDecoder.readString();
				retObj.city_list[i].player_size = myDecoder.readInt();
				retObj.city_list[i].nation_id = myDecoder.readInt();
				retObj.city_list[i].in_battle = myDecoder.readBool();
			}
		}
		retObj.my_city_index = myDecoder.readInt();
		retObj.move_step = myDecoder.readInt();
		retObj.nation_city_count = [];
		let nation_city_count_size = myDecoder.readInt();
		if (nation_city_count_size > 0) {
			for (var i = 0; i < nation_city_count_size; i++) {
				retObj.nation_city_count[i] = myDecoder.readInt();
			}
		}
		retObj.hp_perc = myDecoder.readInt();
		retObj.my_nation = myDecoder.readInt();
		retObj.change_nation_cd = myDecoder.readInt();
		retObj.my_office = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuoZhanCityDetail: function (senderSocket, p_city_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3473);
		myEncoder.writeInt(p_city_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3474: function (myDecoder) {
		var retObj = {};
		retObj.city_index = myDecoder.readInt();
		retObj.players = [];
		let players_size = myDecoder.readInt();
		if (players_size > 0) {
			for (var i = 0; i < players_size; i++) {
				retObj.players[i] = {};
				retObj.players[i].office_index = myDecoder.readInt();
				retObj.players[i].id = myDecoder.readInt();
				retObj.players[i].nickname = myDecoder.readString();
				retObj.players[i].level = myDecoder.readInt();
				retObj.players[i].icon = myDecoder.readInt();
				retObj.players[i].head_frame_id = myDecoder.readInt();
				retObj.players[i].fight = myDecoder.readInt();
				retObj.players[i].hp_perc = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGuoZhanCityMove: function (senderSocket, p_city_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3475);
		myEncoder.writeInt(p_city_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3476: function (myDecoder) {
		var retObj = {};
		retObj.city_index = myDecoder.readInt();
		retObj.ret = myDecoder.readInt();
		retObj.r = myDecoder.readLong();
		retObj.move_step = myDecoder.readInt();
		retObj.players = [];
		let players_size = myDecoder.readInt();
		if (players_size > 0) {
			for (var i = 0; i < players_size; i++) {
				retObj.players[i] = {};
				let playersi_base_info_exist = myDecoder.readBool();
				if (playersi_base_info_exist == true) {
					retObj.players[i].base_info = {};
					retObj.players[i].base_info.office_index = myDecoder.readInt();
					retObj.players[i].base_info.id = myDecoder.readInt();
					retObj.players[i].base_info.nickname = myDecoder.readString();
					retObj.players[i].base_info.level = myDecoder.readInt();
					retObj.players[i].base_info.icon = myDecoder.readInt();
					retObj.players[i].base_info.head_frame_id = myDecoder.readInt();
					retObj.players[i].base_info.fight = myDecoder.readInt();
					retObj.players[i].base_info.hp_perc = myDecoder.readInt();
				}
				let playersi_formation_exist = myDecoder.readBool();
				if (playersi_formation_exist == true) {
					retObj.players[i].formation = {};
					retObj.players[i].formation.fid = myDecoder.readInt();
					retObj.players[i].formation.formationId = myDecoder.readInt();
					retObj.players[i].formation.forward = myDecoder.readInt();
					retObj.players[i].formation.flip = myDecoder.readInt();
					retObj.players[i].formation.a = myDecoder.readInt();
					retObj.players[i].formation.b = myDecoder.readInt();
					retObj.players[i].formation.c = myDecoder.readInt();
					retObj.players[i].formation.d = myDecoder.readInt();
					retObj.players[i].formation.e = myDecoder.readInt();
					retObj.players[i].formation.f = myDecoder.readInt();
					retObj.players[i].formation.g = myDecoder.readInt();
					retObj.players[i].formation.h = myDecoder.readInt();
					retObj.players[i].formation.i = myDecoder.readInt();
					retObj.players[i].formation.j = myDecoder.readInt();
				}
				retObj.players[i].cards = [];
				let playersi_cards_size = myDecoder.readInt();
				if (playersi_cards_size > 0) {
					for (var cards_idx = 0; cards_idx < playersi_cards_size; cards_idx++) {
						retObj.players[i].cards[cards_idx] = {};
						retObj.players[i].cards[cards_idx].template_id = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].level = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].exp = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].grade = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unitLevel = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unitGrade = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unit_type = myDecoder.readInt();

						retObj.players[i].cards[cards_idx].maxhp = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].atk = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].def = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unitMaxhp = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unitAtk = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unitDef = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].unitNum = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].fight = myDecoder.readInt();
						retObj.players[i].cards[cards_idx].extra_props = [];
						let playersi_cardscards_idx_extra_props_size = myDecoder.readInt();
						if (playersi_cardscards_idx_extra_props_size > 0) {
							for (var extra_props_idx = 0; extra_props_idx < playersi_cardscards_idx_extra_props_size; extra_props_idx++) {
								retObj.players[i].cards[cards_idx].extra_props[extra_props_idx] = myDecoder.readInt();
							}
						}
					}
				}
			}
		}
		return retObj;
	},

	send_C2SGuozhanCityCalculate: function (senderSocket, p_result, p_hp_perc, p_rand_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3477);
		myEncoder.writeInt(p_result);
		if (p_hp_perc == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_hp_perc.length);
			p_hp_perc.forEach(function (p_hp_perc_v) {
				myEncoder.writeInt(p_hp_perc_v);
			});
		}
		myEncoder.writeLong(p_rand_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3478: function (myDecoder) {
		var retObj = {};
		retObj.city_index = myDecoder.readInt();
		retObj.ret = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		retObj.move_step = myDecoder.readInt();
		return retObj;
	},

	get_3480: function (myDecoder) {
		var retObj = {};
		retObj.nation_id = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuozhanHistory: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3481);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3482: function (myDecoder) {
		var retObj = {};
		retObj.records = [];
		let records_size = myDecoder.readInt();
		if (records_size > 0) {
			for (var i = 0; i < records_size; i++) {
				retObj.records[i] = {};
				retObj.records[i].action_type = myDecoder.readInt();
				retObj.records[i].target_player_name = myDecoder.readString();
				retObj.records[i].params = [];
				let recordsi_params_size = myDecoder.readInt();
				if (recordsi_params_size > 0) {
					for (var params_idx = 0; params_idx < recordsi_params_size; params_idx++) {
						retObj.records[i].params[params_idx] = myDecoder.readInt();
					}
				}
				retObj.records[i].add_time = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGmCmd: function (senderSocket, p_cmd) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(101);
		myEncoder.writeString(p_cmd);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_102: function (myDecoder) {
		var retObj = {};
		retObj.ret_code = myDecoder.readInt();
		console.log('102:' + JSON.stringify(retObj))
		return retObj;
	},

	get_10000: function (myDecoder) {
		var retObj = {};
		retObj.ret_code = myDecoder.readInt();
		console.log("retObj   " + JSON.stringify(retObj))
		return retObj;
	},

	send_C2SQueryHasRole: function (senderSocket, p_session_id, p_qq_open_data) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10101);
		myEncoder.writeString(p_session_id);
		if (p_qq_open_data == null) {
			myEncoder.writeBool(false);
		} else {
			myEncoder.writeBool(true);
			myEncoder.writeInt(p_qq_open_data.wanba_gift_id);
			myEncoder.writeString(p_qq_open_data.appid);
			myEncoder.writeString(p_qq_open_data.openid);
			myEncoder.writeString(p_qq_open_data.openkey);
			myEncoder.writeString(p_qq_open_data.pf);
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10102: function (myDecoder) {
		var retObj = {};
		retObj.has_role = myDecoder.readBool();
		retObj.qq_nickname = myDecoder.readString();
		return retObj;
	},

	send_C2SCreateCharacter: function (senderSocket, p_sex, p_name, p_session_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10103);
		myEncoder.writeInt(p_sex);
		myEncoder.writeString(p_name);
		myEncoder.writeString(p_session_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10104: function (myDecoder) {
		var retObj = {};
		retObj.ret = myDecoder.readInt();
		retObj.character_id = myDecoder.readInt();
		return retObj;
	},

	send_C2SEnterGame: function (senderSocket, p_session_id, p_wanba_gift) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10105);
		myEncoder.writeString(p_session_id);
		if (p_wanba_gift == null) {
			myEncoder.writeBool(false);
		} else {
			myEncoder.writeBool(true);
			myEncoder.writeInt(p_wanba_gift.wanba_gift_id);
			myEncoder.writeString(p_wanba_gift.appid);
			myEncoder.writeString(p_wanba_gift.openid);
			myEncoder.writeString(p_wanba_gift.openkey);
			myEncoder.writeString(p_wanba_gift.pf);
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10106: function (myDecoder) {
		var retObj = {};
		retObj.current_time_seconds = myDecoder.readInt();
		retObj.in_game_session_id = myDecoder.readString();
		retObj.has_qcjj_activity = myDecoder.readBool();
		retObj.has_qzyb_activity = myDecoder.readBool();
		console.log('10016:' + JSON.stringify(retObj))
		return retObj;
	},

	get_10108: function (myDecoder) {
		var retObj = {};
		retObj.id = myDecoder.readInt();
		retObj.account_id = myDecoder.readString();
		retObj.server_id = myDecoder.readInt();
		retObj.name = myDecoder.readString();
		retObj.sex = myDecoder.readInt();
		retObj.level = myDecoder.readInt();
		retObj.icon = myDecoder.readInt();
		retObj.head_frame = myDecoder.readInt();
		retObj.level_exp = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		retObj.money = myDecoder.readInt();
		retObj.gameMoney = myDecoder.readInt();
		retObj.energy = myDecoder.readInt();

		retObj.vip_level = myDecoder.readInt();
		retObj.vip_exp = myDecoder.readInt();

		retObj.honor = myDecoder.readInt();
		retObj.stamina = myDecoder.readInt();
		retObj.nation_id = myDecoder.readInt();
		/**战力 */
		retObj.troops = myDecoder.readInt();
		/**粮草 */
		retObj.army = myDecoder.readInt();
		retObj.population = myDecoder.readInt();
		retObj.formationSlots = myDecoder.readInt();

		retObj.barracks_build = [];
		let barracks_build_size = myDecoder.readInt();
		if (barracks_build_size > 0) {
			for (var i = 0; i < barracks_build_size; i++) {
				retObj.barracks_build[i] = myDecoder.readInt();
			}
		}
		retObj.resource_build = [];
		let resource_build_size = myDecoder.readInt();
		if (resource_build_size > 0) {
			for (var i = 0; i < resource_build_size; i++) {
				retObj.resource_build[i] = myDecoder.readInt();
			}
		}
		retObj.basic_build = [];
		let basic_build_size = myDecoder.readInt();
		if (basic_build_size > 0) {
			for (var i = 0; i < basic_build_size; i++) {
				retObj.basic_build[i] = myDecoder.readInt();
			}
		}

		retObj.formationStatus = [];
		let formationStatus_size = myDecoder.readInt();
		if (formationStatus_size > 0) {
			for (var i = 0; i < formationStatus_size; i++) {
				retObj.formationStatus[i] = myDecoder.readInt();
			}
		}
		retObj.team_skills = [];
		let team_skills_size = myDecoder.readInt();
		if (team_skills_size > 0) {
			for (var i = 0; i < team_skills_size; i++) {
				retObj.team_skills[i] = myDecoder.readInt();
			}
		}
		retObj.offline_minutes = myDecoder.readInt();
		retObj.offline_add_level = myDecoder.readInt();
		retObj.offline_rewards = [];
		let offline_rewards_size = myDecoder.readInt();
		if (offline_rewards_size > 0) {
			for (var i = 0; i < offline_rewards_size; i++) {
				retObj.offline_rewards[i] = {};
				retObj.offline_rewards[i].itemId = myDecoder.readInt();
				retObj.offline_rewards[i].cnt = myDecoder.readInt();
			}
		}
		let wanba_gift_ret_exist = myDecoder.readBool();
		if (wanba_gift_ret_exist == true) {
			retObj.wanba_gift_ret = {};
			retObj.wanba_gift_ret.wanba_gift_id = myDecoder.readInt();
			retObj.wanba_gift_ret.status = myDecoder.readInt();
		}

		retObj.military_data = [];
		let military_data_size = myDecoder.readInt();
		if (military_data_size > 0) {
			for (var i = 0; i < military_data_size; i++) {
				retObj.military_data[i] = myDecoder.readInt();
			}
		}


		var storgleave_data = [];
		let storgleave_size = myDecoder.readInt();
		if (storgleave_size > 0) {
			for (var i = 0; i < storgleave_size; i++) {
				var data = {}
				var type = myDecoder.readInt();
				var typesize = myDecoder.readInt();
				var lv = [];
				for (var x = 0; x < typesize; x++) {
					lv[x] = myDecoder.readInt();
				}
				data = {
					type: type,
					lv: lv
				}
				storgleave_data.push(data)
			}
		}

		retObj.storgleave_data = storgleave_data
		console.log(retObj)
		console.log('-------------10108---------------------')
		return retObj;
	},

	get_10114: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	get_10116: function (myDecoder) {
		var retObj = {};
		retObj.type = myDecoder.readInt();
		retObj.value = myDecoder.readInt();
		return retObj;
	},

	get_10118: function (myDecoder) {
		var retObj = {};
		retObj.guideInfo = [];
		let guideInfo_size = myDecoder.readInt();
		if (guideInfo_size > 0) {
			for (var i = 0; i < guideInfo_size; i++) {
				retObj.guideInfo[i] = {};
				retObj.guideInfo[i].module = myDecoder.readInt();
				retObj.guideInfo[i].step = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGuideStepSet: function (senderSocket, p_module, p_step) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10119);
		myEncoder.writeInt(p_module);
		myEncoder.writeInt(p_step);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10120: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	get_10122: function (myDecoder) {
		var retObj = {};
		retObj.is_first_pay = myDecoder.readBool();
		retObj.first_award_get = myDecoder.readBool();
		retObj.payment_level = [];
		let payment_level_size = myDecoder.readInt();
		if (payment_level_size > 0) {
			for (var i = 0; i < payment_level_size; i++) {
				retObj.payment_level[i] = myDecoder.readInt();
			}
		}
		retObj.vip_gift_get = [];
		let vip_gift_get_size = myDecoder.readInt();
		if (vip_gift_get_size > 0) {
			for (var i = 0; i < vip_gift_get_size; i++) {
				retObj.vip_gift_get[i] = myDecoder.readInt();
			}
		}
		retObj.is_long_yueka = myDecoder.readBool();
		retObj.long_yueka_get = myDecoder.readBool();
		retObj.yueka_left_day = myDecoder.readInt();
		retObj.yueka_get = myDecoder.readBool();
		return retObj;
	},

	send_C2SGetFirstPayAward: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10123);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10124: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SGetVipGift: function (senderSocket, p_vip_level) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10125);
		myEncoder.writeInt(p_vip_level);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10126: function (myDecoder) {
		var retObj = {};
		retObj.vip_level = myDecoder.readInt();
		return retObj;
	},

	send_C2SDownlineReconnect: function (senderSocket, p_in_game_session_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10127);
		myEncoder.writeString(p_in_game_session_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10128: function (myDecoder) {
		var retObj = {};
		retObj.ret = myDecoder.readInt();
		return retObj;
	},

	send_C2SListRedPoints: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10129);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10130: function (myDecoder) {
		var retObj = {};
		retObj.has_redpoint = [];
		let has_redpoint_size = myDecoder.readInt();
		if (has_redpoint_size > 0) {
			for (var i = 0; i < has_redpoint_size; i++) {
				retObj.has_redpoint[i] = myDecoder.readInt();
			}
		}
		retObj.activity_redpoints = [];
		let activity_redpoints_size = myDecoder.readInt();
		if (activity_redpoints_size > 0) {
			for (var i = 0; i < activity_redpoints_size; i++) {
				retObj.activity_redpoints[i] = myDecoder.readInt();
			}
		}
		console.log(JSON.stringify(retObj))
		return retObj;
	},

	send_C2SQunheiPayPre: function (senderSocket, p_charge_index, p_goodsName) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10131);
		myEncoder.writeInt(p_charge_index);
		myEncoder.writeString(p_goodsName);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10132: function (myDecoder) {
		var retObj = {};
		retObj.charge_index = myDecoder.readInt();
		retObj.ext = myDecoder.readString();
		retObj.sign = myDecoder.readString();
		retObj.goodsName = myDecoder.readString();
		retObj.rmb = myDecoder.readInt();
		return retObj;
	},

	get_10134: function (myDecoder) {
		var retObj = {};
		retObj.type = myDecoder.readInt();
		retObj.yuanbao = myDecoder.readInt();
		retObj.product_id = myDecoder.readInt();
		return retObj;
	},

	get_10136: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SGetYuekaAward: function (senderSocket, p_type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10137);
		myEncoder.writeInt(p_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10138: function (myDecoder) {
		var retObj = {};
		retObj.type = myDecoder.readInt();
		retObj.yuanbao = myDecoder.readInt();
		return retObj;
	},

	send_C2SGetQunheiWxShareAward: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10139);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10140: function (myDecoder) {
		var retObj = {};
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	get_10142: function (myDecoder) {
		var retObj = {};
		retObj.template_id = myDecoder.readInt();
		retObj.order = myDecoder.readInt();
		retObj.parameters = [];
		let parameters_size = myDecoder.readInt();
		if (parameters_size > 0) {
			for (var i = 0; i < parameters_size; i++) {
				retObj.parameters[i] = myDecoder.readString();
			}
		}
		retObj.content = myDecoder.readString();
		retObj.count = myDecoder.readInt();
		return retObj;
	},

	send_C2SRankView: function (senderSocket, p_rank_type) {
		console.log(`请求巅峰战场列表：` + p_rank_type)
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10143);
		myEncoder.writeInt(p_rank_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10144: function (myDecoder) {
		var retObj = {};
		retObj.my_rank = myDecoder.readInt();
		retObj.my_rank_change = myDecoder.readInt();
		retObj.rank_type = myDecoder.readInt();
		retObj.last_time = myDecoder.readLong();
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].playerId = myDecoder.readInt();
				retObj.items[i].nickname = myDecoder.readString();
				retObj.items[i].sexId = myDecoder.readInt();
				retObj.items[i].icon = myDecoder.readInt();
				retObj.items[i].head_frame = myDecoder.readInt();
				retObj.items[i].level = myDecoder.readInt();
				retObj.items[i].fight = myDecoder.readInt();
				retObj.items[i].vipLevel = myDecoder.readInt();
				retObj.items[i].rank_change = myDecoder.readInt();
				retObj.items[i].hero_count = myDecoder.readInt();
				retObj.items[i].hero_stars = myDecoder.readInt();
				retObj.items[i].win_count = myDecoder.readInt();
				retObj.items[i].like_count = myDecoder.readInt();
				var size = myDecoder.readInt();
				// debugger;
				retObj.items[i].card = [];
				for (var x = 0; x < size; x++) {
					retObj.items[i].card[x] = myDecoder.readInt();
				}
			}
		}
		retObj.today_my_like_players = [];
		let today_my_like_players_size = myDecoder.readInt();
		if (today_my_like_players_size > 0) {
			for (var i = 0; i < today_my_like_players_size; i++) {
				retObj.today_my_like_players[i] = myDecoder.readInt();
			}
		}
		retObj.pkWinLoose = [];
		let pkWinLoose_size = myDecoder.readInt();
		if (pkWinLoose_size > 0) {
			for (var i = 0; i < pkWinLoose_size; i++) {
				retObj.pkWinLoose[i] = myDecoder.readInt();
			}
		}
		console.log(JSON.stringify(retObj))
		return retObj;
	},

	send_C2SRankPlayerDetail: function (senderSocket, p_rank_type, p_player_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10145);
		myEncoder.writeInt(p_rank_type);
		myEncoder.writeInt(p_player_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10146: function (myDecoder) {
		var retObj = {};
		debugger;
		retObj.rank_type = myDecoder.readInt();
		let rank_player_exist = myDecoder.readBool();
		if (rank_player_exist == true) {
			retObj.rank_player = {};
			retObj.rank_player.playerId = myDecoder.readInt();
			retObj.rank_player.nickname = myDecoder.readString();
			retObj.rank_player.sexId = myDecoder.readInt();
			retObj.rank_player.icon = myDecoder.readInt();
			retObj.rank_player.head_frame = myDecoder.readInt();
			retObj.rank_player.level = myDecoder.readInt();
			retObj.rank_player.fight = myDecoder.readInt();
			retObj.rank_player.vipLevel = myDecoder.readInt();
			retObj.rank_player.rank_change = myDecoder.readInt();
			retObj.rank_player.hero_count = myDecoder.readInt();
			retObj.rank_player.hero_stars = myDecoder.readInt();
			retObj.rank_player.win_count = myDecoder.readInt();
			retObj.rank_player.like_count = myDecoder.readInt();
		}
		retObj.item = []
		let bing_size = myDecoder.readInt();
		if (bing_size > 0) {
			for (var i = 0; i < bing_size; i++) {

				retObj.item[i] = {};
				retObj.item[i].template_id = myDecoder.readInt();
				retObj.item[i].num = myDecoder.readInt();
			}
		}
		retObj.cardlist = [];
		let cardlist_size = myDecoder.readInt();
		if (cardlist_size > 0) {
			for (var i = 0; i < cardlist_size; i++) {
				retObj.cardlist[i] = {};
				retObj.cardlist[i].id = myDecoder.readInt();
				retObj.cardlist[i].template_id = myDecoder.readInt();
				retObj.cardlist[i].level = myDecoder.readInt();
				retObj.cardlist[i].exp = myDecoder.readInt();
				retObj.cardlist[i].grade = myDecoder.readInt();
				retObj.cardlist[i].unitLevel = myDecoder.readInt();
				retObj.cardlist[i].unitGrade = myDecoder.readInt();
				//retObj.cardlist[i].unit_type = myDecoder.readInt();

				retObj.cardlist[i].maxhp = myDecoder.readInt();
				retObj.cardlist[i].atk = myDecoder.readInt();
				retObj.cardlist[i].def = myDecoder.readInt();
				retObj.cardlist[i].unitMaxhp = myDecoder.readInt();
				retObj.cardlist[i].unitAtk = myDecoder.readInt();
				retObj.cardlist[i].unitDef = myDecoder.readInt();
				retObj.cardlist[i].unitNum = myDecoder.readInt();
				retObj.cardlist[i].fight = myDecoder.readInt();
				// debugger;
				retObj.cardlist[i].proficiency = [];
				retObj.cardlist[i].talents = [];


				let proficiency_size = myDecoder.readInt();
				if (proficiency_size > 0) {
					for (var proficiency_idx = 0; proficiency_idx < proficiency_size; proficiency_idx++) {
						retObj.cardlist[i].proficiency[proficiency_idx] = myDecoder.readInt();
						retObj.cardlist[i].talents[proficiency_idx] = myDecoder.readInt();

					}
				}

				retObj.cardlist[i].equips = [];
				let cardlisti_equips_size = myDecoder.readInt();
				if (cardlisti_equips_size > 0) {
					for (var equips_idx = 0; equips_idx < cardlisti_equips_size; equips_idx++) {
						retObj.cardlist[i].equips[equips_idx] = myDecoder.readInt();
					}
				}
				retObj.cardlist[i].runes = [];
				let cardlisti_runes_size = myDecoder.readInt();
				if (cardlisti_runes_size > 0) {
					for (var runes_idx = 0; runes_idx < cardlisti_runes_size; runes_idx++) {
						retObj.cardlist[i].runes[runes_idx] = myDecoder.readInt();
					}
				}
			}
		}

		retObj.mycardlist = [];
		let mycardlist_size = myDecoder.readInt();
		if (mycardlist_size > 0) {
			for (var i = 0; i < mycardlist_size; i++) {
				retObj.mycardlist[i] = {};
				retObj.mycardlist[i].id = myDecoder.readInt();
				retObj.mycardlist[i].template_id = myDecoder.readInt();
				retObj.mycardlist[i].level = myDecoder.readInt();
				retObj.mycardlist[i].exp = myDecoder.readInt();
				retObj.mycardlist[i].grade = myDecoder.readInt();
				retObj.mycardlist[i].unitLevel = myDecoder.readInt();
				retObj.mycardlist[i].unitGrade = myDecoder.readInt();
				//retObj.cardlist[i].unit_type = myDecoder.readInt();

				retObj.mycardlist[i].maxhp = myDecoder.readInt();
				retObj.mycardlist[i].atk = myDecoder.readInt();
				retObj.mycardlist[i].def = myDecoder.readInt();
				retObj.mycardlist[i].unitMaxhp = myDecoder.readInt();
				retObj.mycardlist[i].unitAtk = myDecoder.readInt();
				retObj.mycardlist[i].unitDef = myDecoder.readInt();
				retObj.mycardlist[i].unitNum = myDecoder.readInt();
				retObj.mycardlist[i].fight = myDecoder.readInt();
				// debugger;
				retObj.mycardlist[i].proficiency = [];
				retObj.mycardlist[i].talents = [];


				let proficiency_size = myDecoder.readInt();
				if (proficiency_size > 0) {
					for (var proficiency_idx = 0; proficiency_idx < proficiency_size; proficiency_idx++) {
						retObj.mycardlist[i].proficiency[proficiency_idx] = myDecoder.readInt();
						retObj.mycardlist[i].talents[proficiency_idx] = myDecoder.readInt();

					}
				}

				retObj.mycardlist[i].equips = [];
				let cardlisti_equips_size = myDecoder.readInt();
				if (cardlisti_equips_size > 0) {
					for (var equips_idx = 0; equips_idx < cardlisti_equips_size; equips_idx++) {
						retObj.mycardlist[i].equips[equips_idx] = myDecoder.readInt();
					}
				}
				retObj.mycardlist[i].runes = [];
				let cardlisti_runes_size = myDecoder.readInt();
				if (cardlisti_runes_size > 0) {
					for (var runes_idx = 0; runes_idx < cardlisti_runes_size; runes_idx++) {
						retObj.mycardlist[i].runes[runes_idx] = myDecoder.readInt();
					}
				}
			}
		}

		retObj.myitem = []
		let mybing_size = myDecoder.readInt();
		if (mybing_size > 0) {
			for (var i = 0; i < mybing_size; i++) {

				retObj.myitem[i] = {};
				retObj.myitem[i].template_id = myDecoder.readInt();
				retObj.myitem[i].num = myDecoder.readInt();
			}
		}

		retObj.pkWinLoose = [];
		let pkWinLoose_size = myDecoder.readInt();
		if (pkWinLoose_size > 0) {
			for (var i = 0; i < pkWinLoose_size; i++) {
				retObj.pkWinLoose[i] = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SZMPayCheck: function (senderSocket, p_fee_id, p_goodsName) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10147);
		myEncoder.writeInt(p_fee_id);
		myEncoder.writeString(p_goodsName);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10148: function (myDecoder) {
		var retObj = {};
		retObj.fee_id = myDecoder.readString();
		retObj.check = myDecoder.readString();
		retObj.extradata = myDecoder.readString();
		retObj.goodsName = myDecoder.readString();
		retObj.rmb = myDecoder.readInt();
		return retObj;
	},

	send_C2SOfflineAwardDouble: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10149);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10150: function (myDecoder) {
		var retObj = {};
		retObj.add_level = myDecoder.readInt();
		return retObj;
	},

	send_C2S333PayPre: function (senderSocket, p_gameId, p_goodsName, p_goodsId) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10151);
		myEncoder.writeInt(p_gameId);
		myEncoder.writeString(p_goodsName);
		myEncoder.writeInt(p_goodsId);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10152: function (myDecoder) {
		var retObj = {};
		retObj.time = myDecoder.readInt();
		retObj.server = myDecoder.readString();
		retObj.role = myDecoder.readString();
		retObj.goodsId = myDecoder.readString();
		retObj.goodsName = myDecoder.readString();
		retObj.money = myDecoder.readInt();
		retObj.cpOrderId = myDecoder.readString();
		retObj.sign = myDecoder.readString();
		return retObj;
	},

	send_C2SChongChongPayPre: function (senderSocket, p_goodsId, p_goodsName) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10153);
		myEncoder.writeInt(p_goodsId);
		myEncoder.writeString(p_goodsName);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10154: function (myDecoder) {
		var retObj = {};
		retObj.goodsId = myDecoder.readInt();
		retObj.egretOrderId = myDecoder.readString();
		retObj.money = myDecoder.readInt();
		retObj.ext = myDecoder.readString();
		retObj.goodsName = myDecoder.readString();
		return retObj;
	},

	send_C2S4399PayPre: function (senderSocket, p_goodsId, p_goodsName) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10155);
		myEncoder.writeInt(p_goodsId);
		myEncoder.writeString(p_goodsName);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10156: function (myDecoder) {
		var retObj = {};
		retObj.goodsId = myDecoder.readInt();
		retObj.rmb = myDecoder.readInt();
		retObj.cpOrderId = myDecoder.readString();
		retObj.extra = myDecoder.readString();
		retObj.goodsName = myDecoder.readString();
		return retObj;
	},

	send_C2SRankLike: function (senderSocket, p_targetPlayerId) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10157);
		myEncoder.writeInt(p_targetPlayerId);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10158: function (myDecoder) {
		var retObj = {};
		retObj.targetPlayerId = myDecoder.readInt();
		retObj.likeCount = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	get_10160: function (myDecoder) {
		var retObj = {};
		retObj.colorType = myDecoder.readInt();
		retObj.content = myDecoder.readString();
		return retObj;
	},

	send_C2SWanBaGetBalance: function (senderSocket, p_appid, p_openid, p_openkey, p_pf, p_os_platfrom, p_goodsId, p_goodsName) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10161);
		myEncoder.writeString(p_appid);
		myEncoder.writeString(p_openid);
		myEncoder.writeString(p_openkey);
		myEncoder.writeString(p_pf);
		myEncoder.writeInt(p_os_platfrom);
		myEncoder.writeInt(p_goodsId);
		myEncoder.writeString(p_goodsName);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10162: function (myDecoder) {
		var retObj = {};
		retObj.is_balance_enough = myDecoder.readBool();
		retObj.defaultScore = myDecoder.readInt();
		retObj.itemid = myDecoder.readInt();
		retObj.cpOrderId = myDecoder.readString();
		retObj.goodsName = myDecoder.readString();
		return retObj;
	},

	send_C2SWanBaPay: function (senderSocket, p_appid, p_openid, p_openkey, p_pf, p_os_platfrom, p_itemid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10163);
		myEncoder.writeString(p_appid);
		myEncoder.writeString(p_openid);
		myEncoder.writeString(p_openkey);
		myEncoder.writeString(p_pf);
		myEncoder.writeInt(p_os_platfrom);
		myEncoder.writeInt(p_itemid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SAddDesktopShortcutAward: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10165);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10166: function (myDecoder) {
		var retObj = {};
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SChangeName: function (senderSocket, p_name) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10167);
		myEncoder.writeString(p_name);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10168: function (myDecoder) {
		var retObj = {};
		retObj.name = myDecoder.readString();
		return retObj;
	},

	send_C2SChangeIcon: function (senderSocket, p_iconId) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10169);
		myEncoder.writeInt(p_iconId);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10170: function (myDecoder) {
		var retObj = {};
		retObj.iconId = myDecoder.readInt();
		return retObj;
	},

	send_C2SListHeadFrame: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10171);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10172: function (myDecoder) {
		var retObj = {};
		retObj.frags_count = [];
		let frags_count_size = myDecoder.readInt();
		if (frags_count_size > 0) {
			for (var i = 0; i < frags_count_size; i++) {
				retObj.frags_count[i] = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SChangeHeadFrame: function (senderSocket, p_head_frame_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10173);
		myEncoder.writeInt(p_head_frame_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10174: function (myDecoder) {
		var retObj = {};
		retObj.head_frame_id = myDecoder.readInt();
		return retObj;
	},

	send_C2SIosIAPVerify: function (senderSocket, p_receipt) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10175);
		myEncoder.writeString(p_receipt);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10176: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	get_10178: function (myDecoder) {
		var retObj = {};
		retObj.ret = myDecoder.readInt();
		return retObj;
	},

	send_C2SQedjList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10179);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10180: function (myDecoder) {
		var retObj = {};
		retObj.is_award_get = myDecoder.readBool();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SQedjAward: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10181);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10182: function (myDecoder) {
		var retObj = {};
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].itemId = myDecoder.readInt();
				retObj.rewards[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGetProtoVersion: function (senderSocket, p_version) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10007);
		myEncoder.writeInt(p_version);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10008: function (myDecoder) {
		var retObj = {};
		retObj.hasNewVersion = myDecoder.readBool();
		retObj.newLoginHost = myDecoder.readString();
		retObj.newLoginPort = myDecoder.readInt();
		return retObj;
	},

	send_C2SLogin: function (senderSocket, p_uname, p_pwd) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10013);
		myEncoder.writeString(p_uname);
		myEncoder.writeString(p_pwd);
		var rawContent = myEncoder.end();
		myEncoder.free();
		console.log('senderSocket:' + senderSocket)
		console.log('p_uname:' + p_uname)

		senderSocket.sendMessage(rawContent);
	},

	get_10014: function (myDecoder) {
		var retObj = {};
		retObj.uid = myDecoder.readInt();
		retObj.session_id = myDecoder.readString();
		console.log('-----------------10014------------------')
		console.log(retObj)
		return retObj;
	},

	send_C2SServerList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10005);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10006: function (myDecoder) {
		var retObj = {};
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].id = myDecoder.readInt();
				retObj.items[i].name = myDecoder.readString();
				retObj.items[i].ip_addr = myDecoder.readString();
				retObj.items[i].port = myDecoder.readInt();
				retObj.items[i].status = myDecoder.readInt();
				retObj.items[i].port_nossl = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SGetAnnounce: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10027);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10028: function (myDecoder) {
		var retObj = {};
		retObj.content = myDecoder.readString();
		return retObj;
	},

	send_C2SSelectServer: function (senderSocket, p_server_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10019);
		myEncoder.writeInt(p_server_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10020: function (myDecoder) {
		var retObj = {};
		retObj.ret = myDecoder.readInt();
		return retObj;
	},

	send_C2SGuestLogin: function (senderSocket, p_uid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10015);
		myEncoder.writeInt(p_uid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10016: function (myDecoder) {
		var retObj = {};
		retObj.uid = myDecoder.readInt();
		retObj.session_id = myDecoder.readString();
		return retObj;
	},

	send_C2SOpenLogin: function (senderSocket, p_access_token, p_open_id, p_platform_type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10017);
		myEncoder.writeString(p_access_token);
		myEncoder.writeString(p_open_id);
		myEncoder.writeInt(p_platform_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10018: function (myDecoder) {
		var retObj = {};
		retObj.open_id = myDecoder.readString();
		retObj.session_id = myDecoder.readString();
		retObj.platform_type = myDecoder.readInt();
		return retObj;
	},

	send_C2SQunheiLogin: function (senderSocket, p_username, p_serverid, p_isadult, p_time, p_flag) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10031);
		myEncoder.writeString(p_username);
		myEncoder.writeInt(p_serverid);
		myEncoder.writeInt(p_isadult);
		myEncoder.writeInt(p_time);
		myEncoder.writeString(p_flag);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10032: function (myDecoder) {
		var retObj = {};
		retObj.session_id = myDecoder.readString();
		return retObj;
	},

	send_C2SWanbaLogin: function (senderSocket, p_appid, p_openid, p_openkey, p_platform, p_pf) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10033);
		myEncoder.writeString(p_appid);
		myEncoder.writeString(p_openid);
		myEncoder.writeString(p_openkey);
		myEncoder.writeInt(p_platform);
		myEncoder.writeString(p_pf);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SZhangMengLogin: function (senderSocket, p_uid, p_t, p_sign) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10035);
		myEncoder.writeString(p_uid);
		myEncoder.writeString(p_t);
		myEncoder.writeString(p_sign);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SThree33Login: function (senderSocket, p_gameId, p_time, p_uid, p_userName, p_sign) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10037);
		myEncoder.writeInt(p_gameId);
		myEncoder.writeInt(p_time);
		myEncoder.writeInt(p_uid);
		myEncoder.writeString(p_userName);
		myEncoder.writeString(p_sign);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SChongChongLogin: function (senderSocket, p_userId, p_time, p_sign) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10039);
		myEncoder.writeString(p_userId);
		myEncoder.writeString(p_time);
		myEncoder.writeString(p_sign);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2S4399Login: function (senderSocket, p_gameId, p_time, p_userId, p_userName, p_sign) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10041);
		myEncoder.writeInt(p_gameId);
		myEncoder.writeInt(p_time);
		myEncoder.writeString(p_userId);
		myEncoder.writeString(p_userName);
		myEncoder.writeString(p_sign);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SYiJieLogin: function (senderSocket, p_appId, p_channelId, p_userId, p_token) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10043);
		myEncoder.writeString(p_appId);
		myEncoder.writeString(p_channelId);
		myEncoder.writeString(p_userId);
		myEncoder.writeString(p_token);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SgNetTopLogin: function (senderSocket, p_userId, p_token) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10045);
		myEncoder.writeString(p_userId);
		myEncoder.writeString(p_token);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SYunbeeLogin: function (senderSocket, p_user_id, p_token) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10047);
		myEncoder.writeString(p_user_id);
		myEncoder.writeString(p_token);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SLiuyeLogin1: function (senderSocket, p_mem_id, p_user_token) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10049);
		myEncoder.writeString(p_mem_id);
		myEncoder.writeString(p_user_token);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SLiuyeLogin2: function (senderSocket, p_mem_id, p_user_token) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10051);
		myEncoder.writeString(p_mem_id);
		myEncoder.writeString(p_user_token);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SPingPingLogin: function (senderSocket, p_game_id, p_user_code, p_login_token, p_game_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10053);
		myEncoder.writeString(p_game_id);
		myEncoder.writeString(p_user_code);
		myEncoder.writeString(p_login_token);
		myEncoder.writeString(p_game_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SXingTengLogin: function (senderSocket, p_app_id, p_uin, p_login_token) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10055);
		myEncoder.writeString(p_app_id);
		myEncoder.writeString(p_uin);
		myEncoder.writeString(p_login_token);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SXingTengLogin2: function (senderSocket, p_app_id, p_uin, p_login_token, p_app_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10057);
		myEncoder.writeString(p_app_id);
		myEncoder.writeString(p_uin);
		myEncoder.writeString(p_login_token);
		myEncoder.writeString(p_app_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SChuangFuLogin: function (senderSocket, p_app_id, p_uin, p_login_token, p_app_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10059);
		myEncoder.writeString(p_app_id);
		myEncoder.writeString(p_uin);
		myEncoder.writeString(p_login_token);
		myEncoder.writeString(p_app_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SQuLeLeLogin: function (senderSocket, p_app_id, p_user_id, p_session_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10061);
		myEncoder.writeString(p_app_id);
		myEncoder.writeString(p_user_id);
		myEncoder.writeString(p_session_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SMiaoRenLogin: function (senderSocket, p_app_id, p_account_id, p_token_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10063);
		myEncoder.writeString(p_app_id);
		myEncoder.writeString(p_account_id);
		myEncoder.writeString(p_token_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SBaoFengLogin: function (senderSocket, p_token, p_product_code, p_uid, p_channel_code) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10065);
		myEncoder.writeString(p_token);
		myEncoder.writeString(p_product_code);
		myEncoder.writeString(p_uid);
		myEncoder.writeString(p_channel_code);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2S185syLogin: function (senderSocket, p_token, p_userID) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10067);
		myEncoder.writeString(p_token);
		myEncoder.writeString(p_userID);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	send_C2SListMail: function (senderSocket, p_mail_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(40001);
		if (p_mail_id == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_mail_id.length);
			p_mail_id.forEach(function (p_mail_id_v) {
				myEncoder.writeInt(p_mail_id_v);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_40002: function (myDecoder) {
		var retObj = {};
		retObj.mailInfoList = [];
		let mailInfoList_size = myDecoder.readInt();
		if (mailInfoList_size > 0) {
			for (var i = 0; i < mailInfoList_size; i++) {
				retObj.mailInfoList[i] = {};
				retObj.mailInfoList[i].mail_id = myDecoder.readInt();
				retObj.mailInfoList[i].mail_type = myDecoder.readInt();
				retObj.mailInfoList[i].template_id = myDecoder.readInt();
				retObj.mailInfoList[i].send_name = myDecoder.readString();
				retObj.mailInfoList[i].title = myDecoder.readString();
				retObj.mailInfoList[i].content = myDecoder.readString();
				retObj.mailInfoList[i].attach = [];
				let mailInfoListi_attach_size = myDecoder.readInt();
				if (mailInfoListi_attach_size > 0) {
					for (var attach_idx = 0; attach_idx < mailInfoListi_attach_size; attach_idx++) {
						retObj.mailInfoList[i].attach[attach_idx] = {};
						retObj.mailInfoList[i].attach[attach_idx].itemId = myDecoder.readInt();
						retObj.mailInfoList[i].attach[attach_idx].cnt = myDecoder.readInt();
					}
				}
				retObj.mailInfoList[i].create_time = myDecoder.readInt();
				retObj.mailInfoList[i].is_read = myDecoder.readInt();
				retObj.mailInfoList[i].mailParamMsg = [];
				let mailInfoListi_mailParamMsg_size = myDecoder.readInt();
				if (mailInfoListi_mailParamMsg_size > 0) {
					for (var mailParamMsg_idx = 0; mailParamMsg_idx < mailInfoListi_mailParamMsg_size; mailParamMsg_idx++) {
						retObj.mailInfoList[i].mailParamMsg[mailParamMsg_idx] = {};
						retObj.mailInfoList[i].mailParamMsg[mailParamMsg_idx].type = myDecoder.readInt();
						retObj.mailInfoList[i].mailParamMsg[mailParamMsg_idx].value = myDecoder.readString();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SGetAttach: function (senderSocket, p_mail_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(40003);
		myEncoder.writeInt(p_mail_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_40004: function (myDecoder) {
		var retObj = {};
		retObj.mail_id = myDecoder.readInt();
		retObj.is_del = myDecoder.readInt();
		return retObj;
	},

	send_C2SReadNewMailMsg: function (senderSocket, p_mail_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(40005);
		myEncoder.writeInt(p_mail_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_40006: function (myDecoder) {
		var retObj = {};
		retObj.mail_id = myDecoder.readInt();
		retObj.is_del = myDecoder.readInt();
		return retObj;
	},

	send_C2SDelMail: function (senderSocket, p_mail_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(40009);
		if (p_mail_id == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_mail_id.length);
			p_mail_id.forEach(function (p_mail_id_v) {
				myEncoder.writeInt(p_mail_id_v);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_40010: function (myDecoder) {
		var retObj = {};
		retObj.mail_id = [];
		let mail_id_size = myDecoder.readInt();
		if (mail_id_size > 0) {
			for (var i = 0; i < mail_id_size; i++) {
				retObj.mail_id[i] = myDecoder.readInt();
			}
		}
		return retObj;
	},

	get_40012: function (myDecoder) {
		var retObj = {};
		let mail_info_exist = myDecoder.readBool();
		if (mail_info_exist == true) {
			retObj.mail_info = {};
			retObj.mail_info.mail_id = myDecoder.readInt();
			retObj.mail_info.mail_type = myDecoder.readInt();
			retObj.mail_info.template_id = myDecoder.readInt();
			retObj.mail_info.send_name = myDecoder.readString();
			retObj.mail_info.title = myDecoder.readString();
			retObj.mail_info.content = myDecoder.readString();
			retObj.mail_info.attach = [];
			let mail_info_attach_size = myDecoder.readInt();
			if (mail_info_attach_size > 0) {
				for (var attach_idx = 0; attach_idx < mail_info_attach_size; attach_idx++) {
					retObj.mail_info.attach[attach_idx] = {};
					retObj.mail_info.attach[attach_idx].itemId = myDecoder.readInt();
					retObj.mail_info.attach[attach_idx].cnt = myDecoder.readInt();
				}
			}
			retObj.mail_info.create_time = myDecoder.readInt();
			retObj.mail_info.is_read = myDecoder.readInt();
			retObj.mail_info.mailParamMsg = [];
			let mail_info_mailParamMsg_size = myDecoder.readInt();
			if (mail_info_mailParamMsg_size > 0) {
				for (var mailParamMsg_idx = 0; mailParamMsg_idx < mail_info_mailParamMsg_size; mailParamMsg_idx++) {
					retObj.mail_info.mailParamMsg[mailParamMsg_idx] = {};
					retObj.mail_info.mailParamMsg[mailParamMsg_idx].type = myDecoder.readInt();
					retObj.mail_info.mailParamMsg[mailParamMsg_idx].value = myDecoder.readString();
				}
			}
		}
		return retObj;
	},

	send_C2SGetAttachAll: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(40013);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_40014: function (myDecoder) {
		var retObj = {};
		retObj.attachs = [];
		let attachs_size = myDecoder.readInt();
		if (attachs_size > 0) {
			for (var i = 0; i < attachs_size; i++) {
				retObj.attachs[i] = {};
				retObj.attachs[i].itemId = myDecoder.readInt();
				retObj.attachs[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SMissionList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2201);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2202: function (myDecoder) {
		var retObj = {};
		retObj.missions = [];
		let missions_size = myDecoder.readInt();
		if (missions_size > 0) {
			for (var i = 0; i < missions_size; i++) {
				retObj.missions[i] = {};
				retObj.missions[i].missionId = myDecoder.readInt();
				retObj.missions[i].progress = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SMissionGetAward: function (senderSocket, p_missionId) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2203);
		myEncoder.writeInt(p_missionId);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2204: function (myDecoder) {
		var retObj = {};
		retObj.missionId = myDecoder.readInt();
		retObj.nextMissionId = myDecoder.readInt();
		retObj.nextProgress = myDecoder.readInt();
		return retObj;
	},

	get_2206: function (myDecoder) {
		var retObj = {};
		retObj.missionId = myDecoder.readInt();
		retObj.progress = myDecoder.readInt();
		return retObj;
	},

	send_C2SMissionGetAwardAll: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2207);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2208: function (myDecoder) {
		var retObj = {};
		retObj.attachs = [];
		let attachs_size = myDecoder.readInt();
		if (attachs_size > 0) {
			for (var i = 0; i < attachs_size; i++) {
				retObj.attachs[i] = {};
				retObj.attachs[i].itemId = myDecoder.readInt();
				retObj.attachs[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SOvercomeInfoAll: function (senderSocket, p_my_fight) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5001);
		myEncoder.writeInt(p_my_fight);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5002: function (myDecoder) {
		var retObj = {};
		retObj.stage_index = myDecoder.readInt();
		retObj.haveReward = myDecoder.readBool();
		retObj.todayResets = myDecoder.readInt();
		retObj.heroHpData = [];
		let heroHpData_size = myDecoder.readInt();
		if (heroHpData_size > 0) {
			for (var i = 0; i < heroHpData_size; i++) {
				retObj.heroHpData[i] = {};
				retObj.heroHpData[i].heroId = myDecoder.readInt();
				retObj.heroHpData[i].hp = myDecoder.readInt();
				retObj.heroHpData[i].unitNum = myDecoder.readInt();
			}
		}
		retObj.enemyHpData = [];
		let enemyHpData_size = myDecoder.readInt();
		if (enemyHpData_size > 0) {
			for (var i = 0; i < enemyHpData_size; i++) {
				retObj.enemyHpData[i] = {};
				retObj.enemyHpData[i].heroId = myDecoder.readInt();
				retObj.enemyHpData[i].hp = myDecoder.readInt();
				retObj.enemyHpData[i].unitNum = myDecoder.readInt();
			}
		}
		let current_enemy_exist = myDecoder.readBool();
		if (current_enemy_exist == true) {
			retObj.current_enemy = {};
			retObj.current_enemy.sexId = myDecoder.readInt();
			retObj.current_enemy.playerId = myDecoder.readInt();
			retObj.current_enemy.level = myDecoder.readInt();
			retObj.current_enemy.rank = myDecoder.readInt();
			retObj.current_enemy.fight = myDecoder.readInt();
			retObj.current_enemy.nickname = myDecoder.readString();
			let current_enemy_formation_exist = myDecoder.readBool();
			if (current_enemy_formation_exist == true) {
				retObj.current_enemy.formation = {};
				retObj.current_enemy.formation.fid = myDecoder.readInt();
				retObj.current_enemy.formation.formationId = myDecoder.readInt();
				retObj.current_enemy.formation.forward = myDecoder.readInt();
				retObj.current_enemy.formation.flip = myDecoder.readInt();
				retObj.current_enemy.formation.a = myDecoder.readInt();
				retObj.current_enemy.formation.b = myDecoder.readInt();
				retObj.current_enemy.formation.c = myDecoder.readInt();
				retObj.current_enemy.formation.d = myDecoder.readInt();
				retObj.current_enemy.formation.e = myDecoder.readInt();
				retObj.current_enemy.formation.f = myDecoder.readInt();
				retObj.current_enemy.formation.g = myDecoder.readInt();
				retObj.current_enemy.formation.h = myDecoder.readInt();
				retObj.current_enemy.formation.i = myDecoder.readInt();
				retObj.current_enemy.formation.j = myDecoder.readInt();
			}
			retObj.current_enemy.cards = [];
			let current_enemy_cards_size = myDecoder.readInt();
			if (current_enemy_cards_size > 0) {
				for (var cards_idx = 0; cards_idx < current_enemy_cards_size; cards_idx++) {
					retObj.current_enemy.cards[cards_idx] = {};
					retObj.current_enemy.cards[cards_idx].template_id = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].level = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].exp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].grade = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitLevel = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitGrade = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unit_type = myDecoder.readInt();

					retObj.current_enemy.cards[cards_idx].maxhp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].atk = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].def = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitMaxhp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitAtk = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitDef = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitNum = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].fight = myDecoder.readInt();
				}
			}
		}
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2SUserOvercomePassStage: function (senderSocket, p_is_win, p_heroHpData, p_rand_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5005);
		myEncoder.writeBool(p_is_win);
		if (p_heroHpData == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_heroHpData.length);
			p_heroHpData.forEach(function (p_heroHpData_v) {
				myEncoder.writeInt(p_heroHpData_v.heroId);
				myEncoder.writeInt(p_heroHpData_v.hp);
				myEncoder.writeInt(p_heroHpData_v.unitNum);
			});
		}
		myEncoder.writeLong(p_rand_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5006: function (myDecoder) {
		var retObj = {};
		retObj.is_win = myDecoder.readBool();
		retObj.heroHpData = [];
		let heroHpData_size = myDecoder.readInt();
		if (heroHpData_size > 0) {
			for (var i = 0; i < heroHpData_size; i++) {
				retObj.heroHpData[i] = {};
				retObj.heroHpData[i].heroId = myDecoder.readInt();
				retObj.heroHpData[i].hp = myDecoder.readInt();
				retObj.heroHpData[i].unitNum = myDecoder.readInt();
			}
		}
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2SOvercomeClaimReward: function (senderSocket, p_my_fight) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5007);
		myEncoder.writeInt(p_my_fight);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5008: function (myDecoder) {
		var retObj = {};
		retObj.gain = [];
		let gain_size = myDecoder.readInt();
		if (gain_size > 0) {
			for (var i = 0; i < gain_size; i++) {
				retObj.gain[i] = {};
				retObj.gain[i].item_template_id = myDecoder.readInt();
				retObj.gain[i].item_count = myDecoder.readInt();
			}
		}
		let current_enemy_exist = myDecoder.readBool();
		if (current_enemy_exist == true) {
			retObj.current_enemy = {};
			retObj.current_enemy.sexId = myDecoder.readInt();
			retObj.current_enemy.playerId = myDecoder.readInt();
			retObj.current_enemy.level = myDecoder.readInt();
			retObj.current_enemy.rank = myDecoder.readInt();
			retObj.current_enemy.fight = myDecoder.readInt();
			retObj.current_enemy.nickname = myDecoder.readString();
			let current_enemy_formation_exist = myDecoder.readBool();
			if (current_enemy_formation_exist == true) {
				retObj.current_enemy.formation = {};
				retObj.current_enemy.formation.fid = myDecoder.readInt();
				retObj.current_enemy.formation.formationId = myDecoder.readInt();
				retObj.current_enemy.formation.forward = myDecoder.readInt();
				retObj.current_enemy.formation.flip = myDecoder.readInt();
				retObj.current_enemy.formation.a = myDecoder.readInt();
				retObj.current_enemy.formation.b = myDecoder.readInt();
				retObj.current_enemy.formation.c = myDecoder.readInt();
				retObj.current_enemy.formation.d = myDecoder.readInt();
				retObj.current_enemy.formation.e = myDecoder.readInt();
				retObj.current_enemy.formation.f = myDecoder.readInt();
				retObj.current_enemy.formation.g = myDecoder.readInt();
				retObj.current_enemy.formation.h = myDecoder.readInt();
				retObj.current_enemy.formation.i = myDecoder.readInt();
				retObj.current_enemy.formation.j = myDecoder.readInt();
			}
			retObj.current_enemy.cards = [];
			let current_enemy_cards_size = myDecoder.readInt();
			if (current_enemy_cards_size > 0) {
				for (var cards_idx = 0; cards_idx < current_enemy_cards_size; cards_idx++) {
					retObj.current_enemy.cards[cards_idx] = {};
					retObj.current_enemy.cards[cards_idx].template_id = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].level = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].exp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].grade = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitLevel = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitGrade = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unit_type = myDecoder.readInt();

					retObj.current_enemy.cards[cards_idx].maxhp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].atk = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].def = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitMaxhp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitAtk = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitDef = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitNum = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].fight = myDecoder.readInt();
				}
			}
		}
		return retObj;
	},

	send_C2SOvercomeReset: function (senderSocket, p_my_fight) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5009);
		myEncoder.writeInt(p_my_fight);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5010: function (myDecoder) {
		var retObj = {};
		retObj.todayResets = myDecoder.readInt();
		let current_enemy_exist = myDecoder.readBool();
		if (current_enemy_exist == true) {
			retObj.current_enemy = {};
			retObj.current_enemy.sexId = myDecoder.readInt();
			retObj.current_enemy.playerId = myDecoder.readInt();
			retObj.current_enemy.level = myDecoder.readInt();
			retObj.current_enemy.rank = myDecoder.readInt();
			retObj.current_enemy.fight = myDecoder.readInt();
			retObj.current_enemy.nickname = myDecoder.readString();
			let current_enemy_formation_exist = myDecoder.readBool();
			if (current_enemy_formation_exist == true) {
				retObj.current_enemy.formation = {};
				retObj.current_enemy.formation.fid = myDecoder.readInt();
				retObj.current_enemy.formation.formationId = myDecoder.readInt();
				retObj.current_enemy.formation.forward = myDecoder.readInt();
				retObj.current_enemy.formation.flip = myDecoder.readInt();
				retObj.current_enemy.formation.a = myDecoder.readInt();
				retObj.current_enemy.formation.b = myDecoder.readInt();
				retObj.current_enemy.formation.c = myDecoder.readInt();
				retObj.current_enemy.formation.d = myDecoder.readInt();
				retObj.current_enemy.formation.e = myDecoder.readInt();
				retObj.current_enemy.formation.f = myDecoder.readInt();
				retObj.current_enemy.formation.g = myDecoder.readInt();
				retObj.current_enemy.formation.h = myDecoder.readInt();
				retObj.current_enemy.formation.i = myDecoder.readInt();
				retObj.current_enemy.formation.j = myDecoder.readInt();
			}
			retObj.current_enemy.cards = [];
			let current_enemy_cards_size = myDecoder.readInt();
			if (current_enemy_cards_size > 0) {
				for (var cards_idx = 0; cards_idx < current_enemy_cards_size; cards_idx++) {
					retObj.current_enemy.cards[cards_idx] = {};
					retObj.current_enemy.cards[cards_idx].template_id = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].level = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].exp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].grade = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitLevel = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitGrade = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unit_type = myDecoder.readInt();

					retObj.current_enemy.cards[cards_idx].maxhp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].atk = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].def = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitMaxhp = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitAtk = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitDef = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].unitNum = myDecoder.readInt();
					retObj.current_enemy.cards[cards_idx].fight = myDecoder.readInt();
				}
			}
		}
		return retObj;
	},

	send_C2SOvercomeItemList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5011);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5012: function (myDecoder) {
		var retObj = {};
		retObj.refreshTimes = myDecoder.readInt();
		retObj.itemsList = [];
		let itemsList_size = myDecoder.readInt();
		if (itemsList_size > 0) {
			for (var i = 0; i < itemsList_size; i++) {
				retObj.itemsList[i] = {};
				retObj.itemsList[i].exchangeIndex = myDecoder.readInt();
				retObj.itemsList[i].itemId = myDecoder.readInt();
				retObj.itemsList[i].num = myDecoder.readInt();
				retObj.itemsList[i].cost = myDecoder.readInt();
				retObj.itemsList[i].times = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SOvercomeExchangeListRefresh: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5013);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5014: function (myDecoder) {
		var retObj = {};
		retObj.refreshTimes = myDecoder.readInt();
		retObj.itemsList = [];
		let itemsList_size = myDecoder.readInt();
		if (itemsList_size > 0) {
			for (var i = 0; i < itemsList_size; i++) {
				retObj.itemsList[i] = {};
				retObj.itemsList[i].exchangeIndex = myDecoder.readInt();
				retObj.itemsList[i].itemId = myDecoder.readInt();
				retObj.itemsList[i].num = myDecoder.readInt();
				retObj.itemsList[i].cost = myDecoder.readInt();
				retObj.itemsList[i].times = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SOvercomeExchange: function (senderSocket, p_exchange_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(5015);
		myEncoder.writeInt(p_exchange_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_5016: function (myDecoder) {
		var retObj = {};
		retObj.exchange_index = myDecoder.readInt();
		let gain_exist = myDecoder.readBool();
		if (gain_exist == true) {
			retObj.gain = {};
			retObj.gain.item_template_id = myDecoder.readInt();
			retObj.gain.item_count = myDecoder.readInt();
		}
		return retObj;
	},

	send_C2SPaymentGetInfo: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4201);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4202: function (myDecoder) {
		var retObj = {};
		retObj.gamemoneyTimes = myDecoder.readInt();
		retObj.energyTimes = myDecoder.readInt();
		return retObj;
	},

	send_C2SPaymentBuyMoney: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4203);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4204: function (myDecoder) {
		var retObj = {};
		retObj.add_gamemoney = myDecoder.readInt();
		retObj.multiple = myDecoder.readInt();
		retObj.gamemoneyTimes = myDecoder.readInt();
		return retObj;
	},

	send_C2SPaymentBuyEnergy: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4205);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4206: function (myDecoder) {
		var retObj = {};
		retObj.current_energy = myDecoder.readInt();
		retObj.energyTimes = myDecoder.readInt();
		retObj.prevEnergyTime = myDecoder.readInt();
		return retObj;
	},

	send_C2SSecretView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3301);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3302: function (myDecoder) {
		var retObj = {};
		retObj.map_id = myDecoder.readInt();
		retObj.progress = myDecoder.readInt();
		retObj.could_reset = myDecoder.readBool();
		retObj.boxAward = [];
		let boxAward_size = myDecoder.readInt();
		if (boxAward_size > 0) {
			for (var i = 0; i < boxAward_size; i++) {
				retObj.boxAward[i] = {};
				retObj.boxAward[i].stage_index = myDecoder.readInt();
				retObj.boxAward[i].award_list = [];
				let boxAwardi_award_list_size = myDecoder.readInt();
				if (boxAwardi_award_list_size > 0) {
					for (var award_list_idx = 0; award_list_idx < boxAwardi_award_list_size; award_list_idx++) {
						retObj.boxAward[i].award_list[award_list_idx] = {};
						retObj.boxAward[i].award_list[award_list_idx].itemId = myDecoder.readInt();
						retObj.boxAward[i].award_list[award_list_idx].cnt = myDecoder.readInt();
					}
				}
				retObj.boxAward[i].is_get = myDecoder.readInt();
			}
		}
		retObj.my_cost = [];
		let my_cost_size = myDecoder.readInt();
		if (my_cost_size > 0) {
			for (var i = 0; i < my_cost_size; i++) {
				retObj.my_cost[i] = {};
				retObj.my_cost[i].hero_type = myDecoder.readInt();
				retObj.my_cost[i].hero_id = myDecoder.readInt();
				retObj.my_cost[i].hp_percent = myDecoder.readInt();
			}
		}
		retObj.enemy_cost = [];
		let enemy_cost_size = myDecoder.readInt();
		if (enemy_cost_size > 0) {
			for (var i = 0; i < enemy_cost_size; i++) {
				retObj.enemy_cost[i] = {};
				retObj.enemy_cost[i].hero_type = myDecoder.readInt();
				retObj.enemy_cost[i].hero_id = myDecoder.readInt();
				retObj.enemy_cost[i].hp_percent = myDecoder.readInt();
			}
		}
		retObj.online_formation = [];
		let online_formation_size = myDecoder.readInt();
		if (online_formation_size > 0) {
			for (var i = 0; i < online_formation_size; i++) {
				retObj.online_formation[i] = {};
				retObj.online_formation[i].hero_type = myDecoder.readInt();
				retObj.online_formation[i].hero_id = myDecoder.readInt();
				retObj.online_formation[i].hp_percent = myDecoder.readInt();
			}
		}
		retObj.revive_count = myDecoder.readInt();
		return retObj;
	},

	send_C2SSecretBattleStart: function (senderSocket, p_map_id, p_online_formation) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3303);
		myEncoder.writeInt(p_map_id);
		if (p_online_formation == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_online_formation.length);
			p_online_formation.forEach(function (p_online_formation_v) {
				myEncoder.writeInt(p_online_formation_v.hero_type);
				myEncoder.writeInt(p_online_formation_v.hero_id);
				myEncoder.writeInt(p_online_formation_v.hp_percent);
			});
		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3304: function (myDecoder) {
		var retObj = {};
		retObj.map_id = myDecoder.readInt();
		retObj.online_formation = [];
		let online_formation_size = myDecoder.readInt();
		if (online_formation_size > 0) {
			for (var i = 0; i < online_formation_size; i++) {
				retObj.online_formation[i] = {};
				retObj.online_formation[i].hero_type = myDecoder.readInt();
				retObj.online_formation[i].hero_id = myDecoder.readInt();
				retObj.online_formation[i].hp_percent = myDecoder.readInt();
			}
		}
		retObj.is_reset = myDecoder.readInt();
		return retObj;
	},

	send_C2SSecretBattleEnd: function (senderSocket, p_is_win, p_my_cost, p_enemy_cost, p_is_interrupt) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3305);
		myEncoder.writeBool(p_is_win);
		if (p_my_cost == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_my_cost.length);
			p_my_cost.forEach(function (p_my_cost_v) {
				myEncoder.writeInt(p_my_cost_v.hero_type);
				myEncoder.writeInt(p_my_cost_v.hero_id);
				myEncoder.writeInt(p_my_cost_v.hp_percent);
			});
		}
		if (p_enemy_cost == null) {
			myEncoder.writeInt(0);
		} else {
			myEncoder.writeInt(p_enemy_cost.length);
			p_enemy_cost.forEach(function (p_enemy_cost_v) {
				myEncoder.writeInt(p_enemy_cost_v.hero_type);
				myEncoder.writeInt(p_enemy_cost_v.hero_id);
				myEncoder.writeInt(p_enemy_cost_v.hp_percent);
			});
		}
		myEncoder.writeBool(p_is_interrupt);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3306: function (myDecoder) {
		var retObj = {};
		retObj.is_win = myDecoder.readBool();
		retObj.reward_items = [];
		let reward_items_size = myDecoder.readInt();
		if (reward_items_size > 0) {
			for (var i = 0; i < reward_items_size; i++) {
				retObj.reward_items[i] = {};
				retObj.reward_items[i].itemId = myDecoder.readInt();
				retObj.reward_items[i].cnt = myDecoder.readInt();
			}
		}
		retObj.is_interrupt = myDecoder.readBool();
		retObj.map_id = myDecoder.readInt();
		retObj.progress = myDecoder.readInt();
		retObj.boxAward = [];
		let boxAward_size = myDecoder.readInt();
		if (boxAward_size > 0) {
			for (var i = 0; i < boxAward_size; i++) {
				retObj.boxAward[i] = {};
				retObj.boxAward[i].stage_index = myDecoder.readInt();
				retObj.boxAward[i].award_list = [];
				let boxAwardi_award_list_size = myDecoder.readInt();
				if (boxAwardi_award_list_size > 0) {
					for (var award_list_idx = 0; award_list_idx < boxAwardi_award_list_size; award_list_idx++) {
						retObj.boxAward[i].award_list[award_list_idx] = {};
						retObj.boxAward[i].award_list[award_list_idx].itemId = myDecoder.readInt();
						retObj.boxAward[i].award_list[award_list_idx].cnt = myDecoder.readInt();
					}
				}
				retObj.boxAward[i].is_get = myDecoder.readInt();
			}
		}
		retObj.my_cost = [];
		let my_cost_size = myDecoder.readInt();
		if (my_cost_size > 0) {
			for (var i = 0; i < my_cost_size; i++) {
				retObj.my_cost[i] = {};
				retObj.my_cost[i].hero_type = myDecoder.readInt();
				retObj.my_cost[i].hero_id = myDecoder.readInt();
				retObj.my_cost[i].hp_percent = myDecoder.readInt();
			}
		}
		retObj.enemy_cost = [];
		let enemy_cost_size = myDecoder.readInt();
		if (enemy_cost_size > 0) {
			for (var i = 0; i < enemy_cost_size; i++) {
				retObj.enemy_cost[i] = {};
				retObj.enemy_cost[i].hero_type = myDecoder.readInt();
				retObj.enemy_cost[i].hero_id = myDecoder.readInt();
				retObj.enemy_cost[i].hp_percent = myDecoder.readInt();
			}
		}
		retObj.online_formation = [];
		let online_formation_size = myDecoder.readInt();
		if (online_formation_size > 0) {
			for (var i = 0; i < online_formation_size; i++) {
				retObj.online_formation[i] = {};
				retObj.online_formation[i].hero_type = myDecoder.readInt();
				retObj.online_formation[i].hero_id = myDecoder.readInt();
				retObj.online_formation[i].hp_percent = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SSecretGetAward: function (senderSocket, p_stage_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3307);
		myEncoder.writeInt(p_stage_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3308: function (myDecoder) {
		var retObj = {};
		retObj.stage_index = myDecoder.readInt();
		retObj.reward_items = [];
		let reward_items_size = myDecoder.readInt();
		if (reward_items_size > 0) {
			for (var i = 0; i < reward_items_size; i++) {
				retObj.reward_items[i] = {};
				retObj.reward_items[i].itemId = myDecoder.readInt();
				retObj.reward_items[i].cnt = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SSecretSoldierRevive: function (senderSocket, p_hero_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3309);
		myEncoder.writeInt(p_hero_id);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3310: function (myDecoder) {
		var retObj = {};
		retObj.hero_id = myDecoder.readInt();
		return retObj;
	},

	send_C2SSecretReset: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3311);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3312: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SPubView: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1041);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1042: function (myDecoder) {
		var retObj = {};
		retObj.free_time2 = myDecoder.readInt();
		retObj.purple_times = myDecoder.readInt();
		return retObj;
	},

	send_C2SPubBuy: function (senderSocket, p_cost_type) {
		console.log('p_cost_type:' + p_cost_type)
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1043);
		myEncoder.writeInt(p_cost_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	/**将领招募返回 */
	get_1044: function (myDecoder) {
		var retObj = {};
		retObj.cost_type = myDecoder.readInt();
		retObj.free_time2 = myDecoder.readInt();
		retObj.purple_times = myDecoder.readInt();
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].id = myDecoder.readString();
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].num = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unit_level = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				// retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].equip1 = myDecoder.readString();
				retObj.cards[i].equip2 = myDecoder.readString();
				retObj.cards[i].equip3 = myDecoder.readString();
				retObj.cards[i].equip4 = myDecoder.readString();
				retObj.cards[i].equip5 = myDecoder.readString();
				retObj.cards[i].equip6 = myDecoder.readString();
				retObj.cards[i].unitEquips = [];
				let cardsi_unitEquips_size = myDecoder.readInt();
				if (cardsi_unitEquips_size > 0) {
					for (var unitEquips_idx = 0; unitEquips_idx < cardsi_unitEquips_size; unitEquips_idx++) {
						retObj.cards[i].unitEquips[unitEquips_idx] = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SMallList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1045);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1046: function (myDecoder) {
		var retObj = {};
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].slot_index = myDecoder.readInt();
				retObj.items[i].buyNum = myDecoder.readInt();
			}
		}
		retObj.packs = [];
		let packs_size = myDecoder.readInt();
		if (packs_size > 0) {
			for (var i = 0; i < packs_size; i++) {
				retObj.packs[i] = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SArmyShopItemList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1047);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1048: function (myDecoder) {
		var retObj = {};
		retObj.refreshTimestamp = myDecoder.readInt();
		retObj.freeTimes = myDecoder.readInt();
		retObj.feeRefreshTimes = myDecoder.readInt();
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].itemTemplateId = myDecoder.readInt();
				retObj.items[i].num = myDecoder.readInt();
				retObj.items[i].gamemoney = myDecoder.readInt();
				retObj.items[i].money = myDecoder.readInt();
				retObj.items[i].times = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SArmyShopBuy: function (senderSocket, p_slot_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1049);
		myEncoder.writeInt(p_slot_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1050: function (myDecoder) {
		var retObj = {};
		retObj.slot_index = myDecoder.readInt();
		retObj.gain_items = [];
		let gain_items_size = myDecoder.readInt();
		if (gain_items_size > 0) {
			for (var i = 0; i < gain_items_size; i++) {
				retObj.gain_items[i] = {};
				retObj.gain_items[i].itemTemplateId = myDecoder.readInt();
				retObj.gain_items[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SArmyShopRefresh: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1051);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1052: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2SVipPackBuy: function (senderSocket, p_vip_level) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1053);
		myEncoder.writeInt(p_vip_level);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1054: function (myDecoder) {
		var retObj = {};
		retObj.vip_level = myDecoder.readInt();
		retObj.gain_items = [];
		let gain_items_size = myDecoder.readInt();
		if (gain_items_size > 0) {
			for (var i = 0; i < gain_items_size; i++) {
				retObj.gain_items[i] = {};
				retObj.gain_items[i].itemTemplateId = myDecoder.readInt();
				retObj.gain_items[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SMallBuy: function (senderSocket, p_slot_index, p_buy_count) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1055);
		myEncoder.writeInt(p_slot_index);
		myEncoder.writeInt(p_buy_count);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1056: function (myDecoder) {
		var retObj = {};
		retObj.slot_index = myDecoder.readInt();
		let item_info_exist = myDecoder.readBool();
		if (item_info_exist == true) {
			retObj.item_info = {};
			retObj.item_info.slot_index = myDecoder.readInt();
			retObj.item_info.buyNum = myDecoder.readInt();
		}
		retObj.gain_items = [];
		let gain_items_size = myDecoder.readInt();
		if (gain_items_size > 0) {
			for (var i = 0; i < gain_items_size; i++) {
				retObj.gain_items[i] = {};
				retObj.gain_items[i].itemTemplateId = myDecoder.readInt();
				retObj.gain_items[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SStageList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3001);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3002: function (myDecoder) {
		var retObj = {};
		retObj.chapters = [];
		let chapters_size = myDecoder.readInt();
		if (chapters_size > 0) {
			for (var i = 0; i < chapters_size; i++) {
				retObj.chapters[i] = {};
				retObj.chapters[i].stages = [];
				let chaptersi_stages_size = myDecoder.readInt();
				if (chaptersi_stages_size > 0) {
					for (var stages_idx = 0; stages_idx < chaptersi_stages_size; stages_idx++) {
						retObj.chapters[i].stages[stages_idx] = {};
						retObj.chapters[i].stages[stages_idx].star = myDecoder.readInt();
						retObj.chapters[i].stages[stages_idx].times = myDecoder.readInt();
						retObj.chapters[i].stages[stages_idx].is_get_award = myDecoder.readBool();
					}
				}
				retObj.chapters[i].star_award = [];
				let chaptersi_star_award_size = myDecoder.readInt();
				if (chaptersi_star_award_size > 0) {
					for (var star_award_idx = 0; star_award_idx < chaptersi_star_award_size; star_award_idx++) {
						retObj.chapters[i].star_award[star_award_idx] = myDecoder.readBool();
					}
				}
			}
		}
		retObj.chapters_elite = [];
		let chapters_elite_size = myDecoder.readInt();
		if (chapters_elite_size > 0) {
			for (var i = 0; i < chapters_elite_size; i++) {
				retObj.chapters_elite[i] = {};
				retObj.chapters_elite[i].stages = [];
				let chapters_elitei_stages_size = myDecoder.readInt();
				if (chapters_elitei_stages_size > 0) {
					for (var stages_idx = 0; stages_idx < chapters_elitei_stages_size; stages_idx++) {
						retObj.chapters_elite[i].stages[stages_idx] = {};
						retObj.chapters_elite[i].stages[stages_idx].star = myDecoder.readInt();
						retObj.chapters_elite[i].stages[stages_idx].times = myDecoder.readInt();
						retObj.chapters_elite[i].stages[stages_idx].is_get_award = myDecoder.readBool();
					}
				}
				retObj.chapters_elite[i].star_award = [];
				let chapters_elitei_star_award_size = myDecoder.readInt();
				if (chapters_elitei_star_award_size > 0) {
					for (var star_award_idx = 0; star_award_idx < chapters_elitei_star_award_size; star_award_idx++) {
						retObj.chapters_elite[i].star_award[star_award_idx] = myDecoder.readBool();
					}
				}
			}
		}
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		retObj.elite_count = myDecoder.readInt();
		retObj.crawl_state = myDecoder.readInt();
		console.log('副本控制数据：' + JSON.stringify(retObj))
		return retObj;
	},

	send_C2SStageEnd: function (senderSocket, p_group_index, p_stage_index, p_is_win, p_seconds, p_hpPercent, arm_size) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3003);
		myEncoder.writeInt(p_group_index);
		myEncoder.writeInt(p_stage_index);
		myEncoder.writeBool(p_is_win);
		myEncoder.writeInt(p_seconds);
		myEncoder.writeInt(p_hpPercent);

		myEncoder.writeInt(arm_size)
		for (var i = 0; i < arm_size.length; i++) {
			myEncoder.writeInt(arm_size[i].arm);
			myEncoder.writeInt(arm_size[i].count);
		}

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},
	get_3004: function (myDecoder) {
		var retObj = {};
		retObj.group_index = myDecoder.readInt();
		retObj.stage_index = myDecoder.readInt();
		retObj.is_win = myDecoder.readBool();
		retObj.star = myDecoder.readInt();
		retObj.times = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].template_id = myDecoder.readInt();
				retObj.rewards[i].num = myDecoder.readInt();
			}
		}

		console.log(JSON.stringify(retObj))
		return retObj;
	},

	//派将与兵
	send_C2SBattleFormationSave: function (senderSocket, p_formation) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3005);
		if (p_formation == null) {
			myEncoder.writeBool(false);
		} else {
			myEncoder.writeBool(true);
			myEncoder.writeInt(p_formation.fid);
			myEncoder.writeInt(p_formation.formationId);
			myEncoder.writeInt(p_formation.forward);
			myEncoder.writeInt(p_formation.flip);
			myEncoder.writeInt(p_formation.a);
			myEncoder.writeInt(p_formation.b);
			myEncoder.writeInt(p_formation.c);
			// myEncoder.writeInt(p_formation.d);
			// myEncoder.writeInt(p_formation.e);
			// myEncoder.writeInt(p_formation.f);
			// myEncoder.writeInt(p_formation.g);
			// myEncoder.writeInt(p_formation.h);
			// myEncoder.writeInt(p_formation.i);
			// myEncoder.writeInt(p_formation.j);
			myEncoder.writeInt(p_formation.soldier.length)//派兵是数据
			for (var i = 0; i < p_formation.soldier.length; i++) {
				myEncoder.writeInt(p_formation.soldier[i].arm)//兵种
				myEncoder.writeInt(p_formation.soldier[i].count)//数量
			}

		}
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3006: function (myDecoder) {
		var retObj = {};
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		return retObj;
	},

	send_C2SBoxAwardGet: function (senderSocket, p_group_index, p_box_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3007);
		myEncoder.writeInt(p_group_index);
		myEncoder.writeInt(p_box_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3008: function (myDecoder) {
		var retObj = {};
		retObj.group_index = myDecoder.readInt();
		retObj.box_index = myDecoder.readInt();
		return retObj;
	},

	send_C2SEliteStageEnd: function (senderSocket, p_group_index, p_stage_index, p_is_win, p_seconds, p_hpPercent, p_die_num) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3009);
		myEncoder.writeInt(p_group_index);
		myEncoder.writeInt(p_stage_index);
		myEncoder.writeBool(p_is_win);
		myEncoder.writeInt(p_seconds);
		myEncoder.writeInt(p_hpPercent);
		myEncoder.writeInt(p_die_num);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3010: function (myDecoder) {
		var retObj = {};
		retObj.group_index = myDecoder.readInt();
		retObj.stage_index = myDecoder.readInt();
		retObj.is_win = myDecoder.readBool();
		retObj.star = myDecoder.readInt();
		retObj.rewards = [];
		let rewards_size = myDecoder.readInt();
		if (rewards_size > 0) {
			for (var i = 0; i < rewards_size; i++) {
				retObj.rewards[i] = {};
				retObj.rewards[i].template_id = myDecoder.readInt();
				retObj.rewards[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2SEliteBoxAwardGet: function (senderSocket, p_group_index, p_box_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3011);
		myEncoder.writeInt(p_group_index);
		myEncoder.writeInt(p_box_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3012: function (myDecoder) {
		var retObj = {};
		retObj.group_index = myDecoder.readInt();
		retObj.box_index = myDecoder.readInt();
		return retObj;
	},

	send_C2SElitePointAwardGet: function (senderSocket, p_group_index, p_stage_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3013);
		myEncoder.writeInt(p_group_index);
		myEncoder.writeInt(p_stage_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3014: function (myDecoder) {
		var retObj = {};
		retObj.group_index = myDecoder.readInt();
		retObj.stage_index = myDecoder.readInt();
		return retObj;
	},

	send_C2SSweepStage: function (senderSocket, p_group_index, p_stage_index, p_sweepTimes, p_costType) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3015);
		myEncoder.writeInt(p_group_index);
		myEncoder.writeInt(p_stage_index);
		myEncoder.writeInt(p_sweepTimes);
		myEncoder.writeInt(p_costType);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3016: function (myDecoder) {
		var retObj = {};
		retObj.group_index = myDecoder.readInt();
		retObj.stage_index = myDecoder.readInt();
		retObj.times = myDecoder.readInt();
		retObj.result = [];
		let result_size = myDecoder.readInt();
		if (result_size > 0) {
			for (var i = 0; i < result_size; i++) {
				retObj.result[i] = {};
				retObj.result[i].sweep1 = [];
				let resulti_sweep1_size = myDecoder.readInt();
				if (resulti_sweep1_size > 0) {
					for (var sweep1_idx = 0; sweep1_idx < resulti_sweep1_size; sweep1_idx++) {
						retObj.result[i].sweep1[sweep1_idx] = {};
						retObj.result[i].sweep1[sweep1_idx].template_id = myDecoder.readInt();
						retObj.result[i].sweep1[sweep1_idx].num = myDecoder.readInt();
					}
				}
			}
		}
		return retObj;
	},

	send_C2SSaveCrawl: function (senderSocket, p_new_state) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3017);
		myEncoder.writeInt(p_new_state);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3018: function (myDecoder) {
		var retObj = {};
		return retObj;
	},

	send_C2STeamSkillList: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3201);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3202: function (myDecoder) {
		var retObj = {};
		retObj.skill_level = [];
		let skill_level_size = myDecoder.readInt();
		if (skill_level_size > 0) {
			for (var i = 0; i < skill_level_size; i++) {
				retObj.skill_level[i] = myDecoder.readInt();
			}
		}
		retObj.points = myDecoder.readInt();
		return retObj;
	},

	send_C2STeamSkillUpgrade: function (senderSocket, p_skill_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3203);
		myEncoder.writeInt(p_skill_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3204: function (myDecoder) {
		var retObj = {};
		retObj.skill_index = myDecoder.readInt();
		retObj.skill_level = [];
		let skill_level_size = myDecoder.readInt();
		if (skill_level_size > 0) {
			for (var i = 0; i < skill_level_size; i++) {
				retObj.skill_level[i] = myDecoder.readInt();
			}
		}
		retObj.points = myDecoder.readInt();
		return retObj;
	},

	get_3206: function (myDecoder) {
		var retObj = {};
		retObj.unlock_index = myDecoder.readInt();
		return retObj;
	},

	send_C2STreasureRobList: function (senderSocket, p_frag_template_id, p_guideReq, p_my_fight) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4801);
		myEncoder.writeInt(p_frag_template_id);
		myEncoder.writeBool(p_guideReq);
		myEncoder.writeInt(p_my_fight);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4802: function (myDecoder) {
		var retObj = {};
		retObj.enemys = [];
		let enemys_size = myDecoder.readInt();
		if (enemys_size > 0) {
			for (var i = 0; i < enemys_size; i++) {
				retObj.enemys[i] = {};
				retObj.enemys[i].sexId = myDecoder.readInt();
				retObj.enemys[i].rank = myDecoder.readInt();
				retObj.enemys[i].playerId = myDecoder.readInt();
				retObj.enemys[i].level = myDecoder.readInt();
				retObj.enemys[i].fight = myDecoder.readInt();
				retObj.enemys[i].nickname = myDecoder.readString();
				retObj.enemys[i].prob = myDecoder.readInt();
			}
		}
		retObj.guideReq = myDecoder.readBool();
		return retObj;
	},

	send_C2STreasureRobEnemyDetail: function (senderSocket, p_enemy_index, p_guideReq) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4803);
		myEncoder.writeInt(p_enemy_index);
		myEncoder.writeBool(p_guideReq);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4804: function (myDecoder) {
		var retObj = {};
		retObj.sexId = myDecoder.readInt();
		retObj.playerId = myDecoder.readInt();
		retObj.level = myDecoder.readInt();
		retObj.rank = myDecoder.readInt();
		retObj.fight = myDecoder.readInt();
		retObj.nickname = myDecoder.readString();
		let formation_exist = myDecoder.readBool();
		if (formation_exist == true) {
			retObj.formation = {};
			retObj.formation.fid = myDecoder.readInt();
			retObj.formation.formationId = myDecoder.readInt();
			retObj.formation.forward = myDecoder.readInt();
			retObj.formation.flip = myDecoder.readInt();
			retObj.formation.a = myDecoder.readInt();
			retObj.formation.b = myDecoder.readInt();
			retObj.formation.c = myDecoder.readInt();
			retObj.formation.d = myDecoder.readInt();
			retObj.formation.e = myDecoder.readInt();
			retObj.formation.f = myDecoder.readInt();
			retObj.formation.g = myDecoder.readInt();
			retObj.formation.h = myDecoder.readInt();
			retObj.formation.i = myDecoder.readInt();
			retObj.formation.j = myDecoder.readInt();
		}
		retObj.cards = [];
		let cards_size = myDecoder.readInt();
		if (cards_size > 0) {
			for (var i = 0; i < cards_size; i++) {
				retObj.cards[i] = {};
				retObj.cards[i].template_id = myDecoder.readInt();
				retObj.cards[i].level = myDecoder.readInt();
				retObj.cards[i].exp = myDecoder.readInt();
				retObj.cards[i].grade = myDecoder.readInt();
				retObj.cards[i].unitLevel = myDecoder.readInt();
				retObj.cards[i].unitGrade = myDecoder.readInt();
				retObj.cards[i].unit_type = myDecoder.readInt();

				retObj.cards[i].maxhp = myDecoder.readInt();
				retObj.cards[i].atk = myDecoder.readInt();
				retObj.cards[i].def = myDecoder.readInt();
				retObj.cards[i].unitMaxhp = myDecoder.readInt();
				retObj.cards[i].unitAtk = myDecoder.readInt();
				retObj.cards[i].unitDef = myDecoder.readInt();
				retObj.cards[i].unitNum = myDecoder.readInt();
				retObj.cards[i].fight = myDecoder.readInt();
			}
		}
		retObj.guideReq = myDecoder.readBool();
		return retObj;
	},

	send_C2STreasureRobCalculate: function (senderSocket, p_enemy_index, p_result, p_guideReq, p_rand_key) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4805);
		myEncoder.writeInt(p_enemy_index);
		myEncoder.writeInt(p_result);
		myEncoder.writeBool(p_guideReq);
		myEncoder.writeLong(p_rand_key);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4806: function (myDecoder) {
		var retObj = {};
		retObj.result = myDecoder.readInt();
		retObj.achieveGameMoney = myDecoder.readInt();
		retObj.achieveExp = myDecoder.readInt();
		retObj.frags = [];
		let frags_size = myDecoder.readInt();
		if (frags_size > 0) {
			for (var i = 0; i < frags_size; i++) {
				retObj.frags[i] = {};
				retObj.frags[i].item_template_id = myDecoder.readInt();
				retObj.frags[i].item_count = myDecoder.readInt();
			}
		}
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].item_template_id = myDecoder.readInt();
				retObj.items[i].item_count = myDecoder.readInt();
			}
		}
		retObj.achieveFragsNum = myDecoder.readInt();
		retObj.dirtyItems = [];
		let dirtyItems_size = myDecoder.readInt();
		if (dirtyItems_size > 0) {
			for (var i = 0; i < dirtyItems_size; i++) {
				retObj.dirtyItems[i] = {};
				retObj.dirtyItems[i].item_template_id = myDecoder.readInt();
				retObj.dirtyItems[i].item_count = myDecoder.readInt();
			}
		}
		retObj.guideReq = myDecoder.readBool();
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2STreasureAvoidRob: function (senderSocket, p_avoidType) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4807);
		myEncoder.writeInt(p_avoidType);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4808: function (myDecoder) {
		var retObj = {};
		retObj.timeStamp = myDecoder.readInt();
		return retObj;
	},

	send_C2STreasureAvoidRobTime: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4809);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4810: function (myDecoder) {
		var retObj = {};
		retObj.timeStamp = myDecoder.readInt();
		return retObj;
	},

	send_C2STreasureRobBattleStart: function (senderSocket, p_enermy_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4811);
		myEncoder.writeInt(p_enermy_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4812: function (myDecoder) {
		var retObj = {};
		retObj.result = myDecoder.readInt();
		retObj.rand_key = myDecoder.readLong();
		return retObj;
	},

	send_C2STreasureAutoRob: function (senderSocket, p_templateId, p_robType) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4813);
		myEncoder.writeInt(p_templateId);
		myEncoder.writeInt(p_robType);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4814: function (myDecoder) {
		var retObj = {};
		retObj.result = myDecoder.readInt();
		retObj.status = myDecoder.readInt();
		retObj.items = [];
		let items_size = myDecoder.readInt();
		if (items_size > 0) {
			for (var i = 0; i < items_size; i++) {
				retObj.items[i] = {};
				retObj.items[i].item_template_id = myDecoder.readInt();
				retObj.items[i].item_count = myDecoder.readInt();
			}
		}
		return retObj;
	},

	send_C2STreasureRobReport: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4815);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4816: function (myDecoder) {
		var retObj = {};
		retObj.reports = [];
		let reports_size = myDecoder.readInt();
		if (reports_size > 0) {
			for (var i = 0; i < reports_size; i++) {
				retObj.reports[i] = {};
				retObj.reports[i].enemy = myDecoder.readInt();
				retObj.reports[i].nickname = myDecoder.readString();
				retObj.reports[i].fight = myDecoder.readInt();
				retObj.reports[i].templateId = myDecoder.readInt();
				retObj.reports[i].time = myDecoder.readInt();
				retObj.reports[i].canRob = myDecoder.readBool();
			}
		}
		return retObj;
	},

	send_C2STreasureRobGrab: function (senderSocket, p_enemy_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(4817);
		myEncoder.writeInt(p_enemy_index);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_4818: function (myDecoder) {
		var retObj = {};
		retObj.result = myDecoder.readInt();
		return retObj;
	},

	send_C2UnitType: function (senderSocket, card_id, unit_type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2099);
		myEncoder.writeInt(card_id);
		myEncoder.writeInt(unit_type);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},
	/**  lv= 升级后等级  type=(1:资源建筑 ，2 兵营建筑 ，3 基础建筑 )    index=建筑里面 对应的 坐标从0 开始 payType 0 金币 1 元宝 */
	send_C2UPBulid: function (senderSocket, lv, type, idx, payType) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10185);
		myEncoder.writeInt(lv);
		myEncoder.writeInt(type);
		myEncoder.writeInt(idx);
		myEncoder.writeInt(payType);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10186: function (myDecoder) {
		var retObj = {};
		retObj.lv = myDecoder.readInt();
		retObj.type = myDecoder.readInt();
		// console.log(`升级返回：`+ JSON.stringify(retObj))
		return retObj;
	},

	// 建筑id cost_type 1 元宝招募  2 粮草    stages_id 兵种ID
	send_C2SRecSoldiers: function (senderSocket, bulidid, cost_type, stages_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1057);
		myEncoder.writeInt(bulidid);
		myEncoder.writeInt(cost_type);
		myEncoder.writeInt(stages_id);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1058: function (myDecoder) {
		var retObj = {};
		retObj.type = myDecoder.readInt();
		retObj.num = myDecoder.readInt();
		return retObj;
	},

	//请求解锁石槽  参数将ID   位置ID 从0开始
	send_C2SOpenRuneSlot: function (senderSocket, hero_id, pos_index) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2025);
		myEncoder.writeInt(hero_id);
		myEncoder.writeInt(pos_index);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	// get_2026: function (myDecoder) {
	// 	var retObj = {};
	// 	retObj.hero_id = myDecoder.readInt();
	// 	retObj.pos_index = myDecoder.readInt();
	// 	return retObj;
	// },

	/**根据类型查找矿 */
	send_C2SFindMines: function (senderSocket, type, country, id, lv) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3115);
		myEncoder.writeInt(type);
		myEncoder.writeInt(country);
		myEncoder.writeInt(id);
		myEncoder.writeInt(lv);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3116: function (myDecoder) {
		var retObj = {};
		retObj.type = myDecoder.readInt();
		retObj.mine_points = [];
		let mine_points_size = myDecoder.readInt();
		if (mine_points_size > 0) {
			for (var i = 0; i < mine_points_size; i++) {
				retObj.mine_points[i] = {};
				let mine_pointsi_hold_player_exist = myDecoder.readBool();
				if (mine_pointsi_hold_player_exist == true) {
					retObj.mine_points[i].hold_player = {};
					retObj.mine_points[i].hold_player.id = myDecoder.readInt();
					retObj.mine_points[i].hold_player.nickname = myDecoder.readString();
					retObj.mine_points[i].hold_player.level = myDecoder.readInt();
					retObj.mine_points[i].hold_player.icon = myDecoder.readInt();
					retObj.mine_points[i].hold_player.head_frame_id = myDecoder.readInt();
					retObj.mine_points[i].hold_player.fight = myDecoder.readInt();
					retObj.mine_points[i].hold_player.cd_time = myDecoder.readInt();
					retObj.mine_points[i].hold_player.group = myDecoder.readInt();
					retObj.mine_points[i].hold_player.lv = myDecoder.readInt();
					retObj.mine_points[i].hold_player.page = myDecoder.readInt();
					retObj.mine_points[i].hold_player.idx = myDecoder.readInt();
					retObj.mine_points[i].hold_player.country = myDecoder.readInt();
					retObj.mine_points[i].hold_player.reward = myDecoder.readInt();
				}
			}
		}
		return retObj;
	},


	send_C2SIdentify: function (senderSocket, p_card_id) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2050);
		myEncoder.writeInt(p_card_id);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2051: function (myDecoder) {
		var retObj = {};
		retObj.card_id = myDecoder.readInt();
		retObj.aptitude = [];


		let aptitude_size = myDecoder.readInt();
		if (aptitude_size > 0) {
			for (var i = 0; i < aptitude_size; i++) {
				retObj.aptitude[i] = myDecoder.readInt();;
			}
		}
		return retObj;
	},

	send_C2SMineConstructionUp: function (senderSocket, x, y, county, lv) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3117);
		myEncoder.writeInt(x);
		myEncoder.writeInt(y);
		myEncoder.writeInt(county);
		myEncoder.writeInt(lv);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},
	get_3118: function (myDecoder) {
		var retObj = {};
		retObj.x = myDecoder.readInt();
		retObj.y = myDecoder.readInt();
		retObj.c = myDecoder.readInt();
		retObj.lv = myDecoder.readInt();
		// console.log(`升级返回：`+ JSON.stringify(retObj))
		return retObj;
	},

	send_C2SEviGate: function (senderSocket, x, y, county, type) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(3119);
		myEncoder.writeInt(x);
		myEncoder.writeInt(y);
		myEncoder.writeInt(county);
		if (!type) type = 0
		myEncoder.writeInt(type);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_3120: function (myDecoder) {
		var retObj = {};
		retObj.x = myDecoder.readInt();
		retObj.y = myDecoder.readInt();
		retObj.county = myDecoder.readInt();
		retObj.state = myDecoder.readInt();
		return retObj;
	},

	send_C2SSKillTeach(senderSocket, cardid, idx, skillid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2035);
		myEncoder.writeInt(cardid);
		myEncoder.writeInt(idx);
		myEncoder.writeInt(skillid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2036: function (myDecoder) {
		var retObj = {};
		retObj.cardid = myDecoder.readInt();
		retObj.idx = myDecoder.readInt();
		retObj.skillid = myDecoder.readInt();
		return retObj;
	},

	send_C2SSKillStUp(senderSocket, cardid, idx, skillid, lv) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(2037);
		myEncoder.writeInt(cardid);
		myEncoder.writeInt(idx);
		myEncoder.writeInt(skillid);
		myEncoder.writeInt(lv);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_2038: function (myDecoder) {
		var retObj = {};
		retObj.cardid = myDecoder.readInt();
		retObj.idx = myDecoder.readInt();
		retObj.skillid = myDecoder.readInt();
		retObj.lv = myDecoder.readInt();

		return retObj;
	},



	send_C2SRebirth: function (senderSocket) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(1059);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_1060: function (myDecoder) {
		var retObj = {};
		retObj.num = myDecoder.readInt();
		return retObj;
	},

	/**兵种强化 idx 兵种 type 属性 1-6  挥砍-穿刺之类 */
	send_C2SSoliderStren: function (senderSocket, lv, idx, type) {
		console.log(lv, idx, type)
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10187);

		myEncoder.writeInt(lv);
		myEncoder.writeInt(idx);
		myEncoder.writeInt(type);
		myEncoder.writeInt(0);

		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10188: function (myDecoder) {
		var retObj = {};
		retObj.lv = myDecoder.readInt();
		retObj.idx = myDecoder.readInt();
		retObj.type = myDecoder.readInt();

		return retObj;
	},

	send_C2SEmbryoUp: function (senderSocket, uuid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10330);
		myEncoder.writeString(uuid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},

	get_10331: function (myDecoder) {
		var retObj = {};
		retObj.uuid = myDecoder.readString();
		retObj.lv = myDecoder.readInt();
		retObj.reward_item = [];
		let reward_item_size = myDecoder.readInt();
		if (reward_item_size > 0) {
			for (var i = 0; i < reward_item_size; i++) {
				retObj.reward_item[i] = {};
				retObj.reward_item[i].template_id = myDecoder.readInt();
				retObj.reward_item[i].bagId = myDecoder.readInt();
				retObj.reward_item[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	},


	send_C2SEquipRestore: function (senderSocket, uuid) {
		var myEncoder = WsEncoder.alloc();
		myEncoder.writeInt(10332);
		myEncoder.writeString(uuid);
		var rawContent = myEncoder.end();
		myEncoder.free();
		senderSocket.sendMessage(rawContent);
	},
	get_10333: function (myDecoder) {
		var retObj = {};
		retObj.uuid = myDecoder.readInt();
		retObj.lv = myDecoder.readInt();
		retObj.reward_item = [];
		let reward_item_size = myDecoder.readInt();
		if (reward_item_size > 0) {
			for (var i = 0; i < reward_item_size; i++) {
				retObj.reward_item[i] = {};
				retObj.reward_item[i].template_id = myDecoder.readInt();
				retObj.reward_item[i].bagId = myDecoder.readInt();
				retObj.reward_item[i].num = myDecoder.readInt();
			}
		}
		return retObj;
	}




}

// export default MyProtocols = MyProtocols
module.exports = MyProtocols;