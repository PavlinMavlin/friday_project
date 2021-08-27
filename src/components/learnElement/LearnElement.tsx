import React, {useCallback, useEffect, useState} from "react"
import {Redirect, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {CardType} from "../../api/api"
import {AppRootStateType} from "../../redux/store"
import {getCardsTC} from "../../redux/reducers/cardsList-reducer"
import {gradeCardTC} from "../../redux/reducers/learnPack-reducer"
import {LearnQuestion} from "./learnQuestion/LearnQuestion"
import {LearnAnswer} from "./learnAnswer/LearnAnswer"
import s from "./LearnElement.module.scss";

export type AnswerType = -1 | 0 | 1 | 2 | 3 | 4 | 5

const grades = ["No idea", "Forgot", "Think long", "Mix up", "Knew"]

const getRandomCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
        return {sum: newSum, id: newSum < rand ? i : acc.id}
    }, {sum: 0, id: -1})
    return cards[res.id + 1]
}

export const LearnElement: React.FC = React.memo(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)

    const {
        cards, searchCardsValue,
        sortCardsQuestionOrder, sortCardsAnswerOrder, sortCardsUpdateOrder, sortCardsGradeOrder, sortCardsFilter,
        pageCount, page
    } = useSelector((state: AppRootStateType) => state.cardsListReducer)
    const dispatch = useDispatch()

    const [firstCard, setFirstCard] = useState<boolean>(true)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [card, setCard] = useState<CardType>({_id: ""} as CardType)

    const {questionId} = useParams<{ questionId: string }>()

    useEffect(() => {
        if (firstCard) {
            dispatch(getCardsTC(questionId.slice(1), page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter))
            setFirstCard(false)
        }
        if (cards.length > 0) {
            setCard(getRandomCard(cards))
        }
    }, [dispatch, cards, firstCard, questionId, page, pageCount, searchCardsValue, sortCardsQuestionOrder, sortCardsUpdateOrder, sortCardsFilter, sortCardsGradeOrder, sortCardsAnswerOrder])

    const onNextCard = useCallback((grade: number) => {
        setShowAnswer(false)
        if (cards.length > 0) {
            if (grade !== -1) {
                dispatch(gradeCardTC(card._id, grade))
            }
            setCard(getRandomCard(cards))
        }
    }, [dispatch, cards, card])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.learnWrap}>
            {!showAnswer
                ? <LearnQuestion
                    card={card}
                    setShowAnswer={setShowAnswer}
                />
                : <LearnAnswer
                    card={card}
                    grades={grades}
                    setShowAnswer={setShowAnswer}
                    onNextCard={onNextCard}
                />
            }
        </div>
    )
})