/* Code Plan
enterShip function should only allow crew members to enter ships based on their job type.
entership should push this into crew of the new ship.
entership should not allow someone to enter the same ship twice

crewmember has one method enterShip

ship has one method missionStatement
missionStatement should only return if ship has crew
*/

'use strict';

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

//class for crewmembers, crewmembers start with no ship assigned
class CrewMember {
  constructor(name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
  }


  //crew members can only enter ships based on their job
  //crew members cannot enter the same ship twice or enter a ship that doesn't exist
  enterShip(shipName) {
    console.log(jobTypes[this.job])
    if((shipName && (shipName.type === jobTypes[this.job] || this.job === 'programmer')) && shipName.crew.indexOf(this) === -1) {
      this.ship = shipName;
      shipName.crew.push(this)
    } else if (!shipName) {
        console.log(`${shipName} does not exist... yet.`)
    } else if (shipName.crew.indexOf(this) > -1) {
        console.log('You are already on this ship.')
    } else {
        console.log('You are not allowed on this ship.')
    }
  }
}

//class for ships, ships start with no crew
class Ship {
  constructor (name, type, ability) {
    this.name = name;
    this.type = type;
    this. ability = ability;
    this.crew = [];
  }

  //only returns ability if the ship has a crew
  missionStatement() {
    if(this.crew.length === 0) return "Can't perform a mission yet."
      return this.ability
  }

}

//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
