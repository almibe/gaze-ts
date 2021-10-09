/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { should } from 'chai'
import { Left, Right } from "purify-ts"
import { Gaze } from '../lib'
 
should()

describe("Gaze", () => {
    it("init Gaze", () => {
        let gaze = new Gaze(["hello"]);
        gaze.isComplete.should.be.false
    })
})
