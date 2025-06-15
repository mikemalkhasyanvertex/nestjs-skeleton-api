import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsArray, IsEnum } from 'class-validator';

export enum TOURNAMENTS {
  friendly = 'Friendly',
  african_cup_of_nations = 'African Cup of Nations',
  afc_asian_cup_qualification = 'AFC Asian Cup qualification',
  nordic_championship = 'Nordic Championship',
  cyprus_international_tournament = 'Cyprus International Tournament',
  lunar_new_year_cup = 'Lunar New Year Cup',
  malta_international_tournament = 'Malta International Tournament',
  gold_cup = 'Gold Cup',
  kings_cup = "King's Cup",
  fifa_world_cup_qualification = 'FIFA World Cup qualification',
  cosafa_cup = 'COSAFA Cup',
  oceania_nations_cup_qualification = 'Oceania Nations Cup qualification',
  baltic_cup = 'Baltic Cup',
  amilcar_cabral_cup = 'Amílcar Cabral Cup',
  waff_championship = 'WAFF Championship',
  usa_cup = 'USA Cup',
  king_hassan_ii_tournament = 'King Hassan II Tournament',
  uefa_euro = 'UEFA Euro',
  kirin_cup = 'Kirin Cup',
  oceania_nations_cup = 'Oceania Nations Cup',
  african_cup_of_nations_qualification = 'African Cup of Nations qualification',
  merdeka_tournament = 'Merdeka Tournament',
  united_arab_emirates_friendship_tournament = 'United Arab Emirates Friendship Tournament',
  afc_asian_cup = 'AFC Asian Cup',
  aff_championship = 'AFF Championship',
  cecafa_cup = 'CECAFA Cup',
  millennium_cup = 'Millennium Cup',
  cfu_caribbean_cup_qualification = 'CFU Caribbean Cup qualification',
  windward_islands_tournament = 'Windward Islands Tournament',
  cfu_caribbean_cup = 'CFU Caribbean Cup',
  uncaf_cup = 'UNCAF Cup',
  confederations_cup = 'Confederations Cup',
  island_games = 'Island Games',
  copa_america = 'Copa América',
  skn_football_festival = 'SKN Football Festival',
  gold_cup_qualification = 'Gold Cup qualification',
}

export class GetSMAggregatedResultsByQueryParams {
  @ApiPropertyOptional({
    enum: TOURNAMENTS,
    isArray: true,
    example: [
      TOURNAMENTS.friendly,
      TOURNAMENTS.cyprus_international_tournament,
    ],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(TOURNAMENTS, { each: true })
  tournaments?: TOURNAMENTS[];
}
