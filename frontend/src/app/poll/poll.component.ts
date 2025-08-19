import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { Poll } from '../poll.models';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})


export class PollComponent implements OnInit{

  newPoll: Poll = {
    id: 0,
    question: '',
    options: [
    {optionText: '',voteCount: 0},
    {optionText: '',voteCount: 0}
    ]
  }



  polls : Poll[] = [];

  constructor(private pollService: PollService){}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(){
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error("Error Fetching Data");
      }
    });
  }

  trackByIndex(index: number): number{
    return index;
  }


  createPoll(){

  const pollToCreate = {

    question: this.newPoll.question,
    options: this.newPoll.options
  };

    this.pollService.createPoll(pollToCreate).subscribe({
      next:  (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (error) => { console.error("Error creating poll:", error);

      }
    });
  }


  resetPoll(){
    this.newPoll = {
    id: 0,
    question: '',
    options: [
      {optionText: '',voteCount: 0},
      {optionText: '',voteCount: 0}
    ]
  }
  }

  vote(pollId : number , optionIndex: number){


      this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find(p => p.id == pollId)
        if(poll){
          poll.options[optionIndex].voteCount++;
        }
      },
      error: (error) => console.error("error voting on a poll", error)
    })
  }

  add_option(){
    this.newPoll.options.push({optionText: '',voteCount: 0})
  }

  remove_option(){
    this.newPoll.options.pop();
  }
}
