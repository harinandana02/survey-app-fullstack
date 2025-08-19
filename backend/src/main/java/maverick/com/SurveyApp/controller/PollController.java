package maverick.com.SurveyApp.controller;

import maverick.com.SurveyApp.model.Poll;
import maverick.com.SurveyApp.services.PollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import maverick.com.SurveyApp.request.Vote;

import java.util.List;

@RestController()
@RequestMapping("/api/polls")
@CrossOrigin(origins = "https://survey-app-fullstack.vercel.app/")
public class PollController {

  private final PollService pollService;

  public PollController(PollService pollService) {
    this.pollService = pollService;
  }

  @PostMapping
  public Poll createPoll(@RequestBody Poll poll) {
    return pollService.createPoll(poll);
  }

  @GetMapping
  public List<Poll> getAllPolls() {
    return pollService.getAllPolls();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Poll> getPoll(@PathVariable Long id) {
    return pollService.getPollById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/vote")
  public void vote(@RequestBody Vote vote) {
    pollService.vote(vote.getPollId(), vote.getOptionIndex());
  }
}
