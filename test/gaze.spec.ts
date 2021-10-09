/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { should } from 'chai'
import { Just, Left, Nothing, Right } from "purify-ts"
import { Gaze, takeString, takeWhile } from '../lib'
 
should()

describe("Gaze", () => {
    it("init Gaze with zero values", () => {
        let gaze = new Gaze([])
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })

    it("init Gaze with empty string", () => {
        let gaze = Gaze.from("")
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })

    it("init Gaze with one value", () => {
        let gaze = new Gaze([5]);
        gaze.isComplete().should.be.false
        gaze.peek().should.be.eql(Just(5))
        gaze.next().should.be.eql(Just(5))
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })

    it("init Gaze with single char string", () => {
        let gaze = Gaze.from("5");
        gaze.isComplete().should.be.false
        gaze.peek().should.be.eql(Just("5"))
        gaze.next().should.be.eql(Just("5"))
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })
})

describe("Take String", () => {
    it("take string with zero values", () => {
        let gaze = Gaze.from("")
        let ts = takeString("hello")
        gaze.attempt(ts).should.be.eql(Left({}))
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })

    it("take string with no match", () => {
        let gaze = Gaze.from("goodbye")
        let ts = takeString("hello")
        gaze.attempt(ts).should.be.eql(Left({}))
        gaze.isComplete().should.be.false
        gaze.peek().should.be.eql(Just("g"))
        gaze.isComplete().should.be.false
    })

    it("take string with single char match", () => {
        let gaze = Gaze.from("hello")
        let ts = takeString("h")
        gaze.attempt(ts).should.be.eql(Right("h"))
        gaze.isComplete().should.be.false
        gaze.peek().should.be.eql(Just("e"))
        gaze.isComplete().should.be.false
    })

    it("take string with full match", () => {
        let gaze = Gaze.from("hello")
        let ts = takeString("hello")
        gaze.attempt(ts).should.be.eql(Right("hello"))
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })
})

describe("Take While", () => {
    it("take while with zero values", () => {
        let gaze = Gaze.from("")
        let ts = takeWhile((s: string) => {
            return true
        })
        gaze.attempt(ts).should.be.eql(Left({}))
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })

    it("take while with one result", () => {
        let gaze = Gaze.from("hello")
        let ts = takeWhile((s: string) => {
            return s == "h"
        })
        gaze.attempt(ts).should.be.eql(Right("h"))
        gaze.isComplete().should.be.false
        gaze.peek().should.be.eql(Just("e"))
        gaze.next().should.be.eql(Just("e"))
        gaze.isComplete().should.be.false
    })

    it("take while with full match", () => {
        let gaze = Gaze.from("hello")
        let ts = takeWhile((s: string) => {
            return true
        })
        gaze.attempt(ts).should.be.eql(Right("hello"))
        gaze.isComplete().should.be.true
        gaze.peek().should.be.eql(Nothing)
        gaze.next().should.be.eql(Nothing)
        gaze.isComplete().should.be.true
    })
})
