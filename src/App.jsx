import './App.css';
import { useEffect, useMemo, useState} from "react";
import Quiz from './components/Quiz';
import Timer from './components/Timer';
import Start from './components/Start';
import axios from 'axios';
// import useAxios from 'axios-hooks';

function App() {
  const listMoney = useMemo(() => 
    [
      {id: 1, amount: "200,000đ"},
      {id: 2, amount: "400,000đ"},
      {id: 3, amount: "600,000đ"},
      {id: 4, amount: "1,000,000đ"},
      {id: 5, amount: "2,000,000đ"},
      {id: 6, amount: "3,000,000đ"},
      {id: 7, amount: "6,000,000đ"},
      {id: 8, amount: "10,000,000đ"},
      {id: 9, amount: "14,000,000đ"},
      {id: 10, amount: "22,000,000đ"},
      {id: 11, amount: "30,000,000đ"},
      {id: 12, amount: "40,000,000đ"},
      {id: 13, amount: "60,000,000đ"},
      {id: 14, amount: "85,000,000đ"},
      {id: 15, amount: "150,000,000đ"},
    ].reverse()
  , []);

  const data1 = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
    {
      id: 4,
      question: "Which team won the 2015-16 English Premier League?",
      answers: [
        {
          text: "Leicester City",
          correct: true,
        },
        {
          text: "Liverpool",
          correct: false,
        },
        {
          text: "Cheslea",
          correct: false,
        },
        {
          text: "Manchester United",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "If soccer is called football in England, what is American football called in England?",
      answers: [
        {
          text: "Combball",
          correct: false,
        },
        {
          text: "Geography",
          correct: true,
        },
        {
          text: "Handball",
          correct: false,
        },
        {
          text: "Touchdown",
          correct: false,
        },
      ],
    }
  ];

  //const api = Axios.create();
  // const [{ data: getData}] = useAxios(
  //   'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'
  // )
  // console.log(JSON.stringify(getData));


  const [questionNumber, setQuestionNumber] = useState(1);
  const [userName, setUserName] = useState(null);
  const [stop, setStop] = useState(false);
  const [enarnd, setEnarnd] = useState("0đ");
  const [fakeData, setFakeData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://opentdb.com/api.php?amount=15&difficulty=easy&type=multiple',
      );

      setFakeData(result.data.results);
      
    };
    fetchData();
  }, [])
  // setData(() => {
  //   fakeData.map((item) => {
  //     return [item.question];
  // }) 
  //     // item.question;
  //       // question: item.question, answers: [{text: item.correct_answer, correct: false}]]
  // });
  
  // const normalizeData = oze => oze.map(i => ({
  //   question: i.question,
  //   answers: [
  //     {
  //       text: i.correct_answer,
  //       correct: true,
  //     }
  //   ],
  // }))

  // setData(normalizeData(fakeData));


  useEffect(()=>{
    setData(
      fakeData.map( (e, i) => (
        {id: i, question: e.question, answers:[{text: e.correct_answer, correct: true}]}
      ))
    )
     
    // setData(
    //   fakeData.map( (e, i) => (
    //     {answers:[{text: e.incorrect_answers, correct: false}, ...data[i].answers]}
    //   ))
    // )
  }, [fakeData])


  

  console.log("api: ", (fakeData));
  // console.log("api: ", (fakeData[0].incorrect_answers));
  console.log("data: ", data);
  // console.log(data1);

  useEffect(() => {
    questionNumber > 1 && 
      setEnarnd(listMoney.find((m) => m.id === questionNumber - 1 ).amount);
  }, [listMoney, questionNumber]);
  
  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">         
            {stop ? <h1>You enarnd: {enarnd}</h1> : (
              <>
                <div className="top">
                  <div className="timer"> 
                  <Timer 
                    setStop={setStop}
                    questionNumber={questionNumber}
                  />
                  </div>
                </div>
            <div className="bottom">
            <Quiz 
              key={data.id}
              data={data} 
              setStop={setStop} 
              questionNumber={questionNumber} 
              setQuestionNumber={setQuestionNumber} 
          />
        </div>
 

          </>
        )}
        
      </div>
      <div className="pyramid">
        <ul className="moneyList">
        {listMoney.map((m)=>(
          <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemId">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li> 
        ))}
          
        </ul>
      </div>
        </>
      ) : (<Start  setUserName = {setUserName} />)}
      </div>
  );
}

export default App;
