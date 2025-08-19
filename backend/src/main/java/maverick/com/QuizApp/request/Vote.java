package maverick.com.QuizApp.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import maverick.com.QuizApp.model.Poll;

@Data
@NoArgsConstructor
public class Vote {
    private Long pollId;
    private int optionIndex;

}
