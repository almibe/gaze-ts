/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Either, Just, Maybe, Nothing } from 'purify-ts';

export * from './steps'

export class Gaze<I> { //TODO make a class
    constructor(input: Array<I>) {
        this.input = input
    }
    private offset: number = 0
    private readonly input: Array<I>

    static from(text: string): Gaze<string> {
        return new Gaze(text.split(""));
        // let input = text.graphemes(true).collect::<Vec<&str>>();
        // Gaze { input, offset: 0 }
    }

    isComplete(): boolean {
        return this.offset >= this.input.length
    }

    peek(): Maybe<I> {
        if (this.isComplete()) {
            return Nothing
        } else {
            return Just(this.input[this.offset])
        }
    }

    next(): Maybe<I> {
        if (this.isComplete()) {
            return Nothing
        } else {
            let next = Just(this.input[this.offset])
            this.offset += 1
            return next
        }
    }

    attempt<T, E>(step: Step<I, T, E>): Either<E, T> {
//        let startOfThisLoop = this.offset;
//        let res = step(this);

        // if (res.)

        // match res {
        //     Ok(_) => res,
        //     Err(e) => {
        //         this.offset = startOfThisLoop;
        //         Err(e)
        //     }
        // }
        throw new Error("TODO")
    }

    ignore<T, E>(step: Step<I, T, E>) {
        // let startOfThisLoop = this.offset;
        // let res = step(this);
        // if res.is_err() {
        //     this.offset = startOfThisLoop;
        // }
        throw new Error("TODO")
    }
}

export type Step<I, E, T> = (gaze: Gaze<I>) => Either<E, T>
