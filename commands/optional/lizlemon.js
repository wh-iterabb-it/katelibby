module.exports = (callback, target, from, args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
        callback.say(target, 'lizlemon, return a random Liz Lemon Quote');
        callback.say(target, 'Syntax is ' + callback.config.commandChar +
         'lizlemon ');
        return 'help';
    }
  }
  const li = [
    '“Oh… That word bums me out unless it’s between the words meat and pizza.”(Episode 2.8, “Secrets and Lies”)',
    'Why are my arms so weak? It’s like I did that push-up last year for nothing!” (Season 7.6, “Aunt Phatso vs. Jack Donaghy”)',
    'I was going to take this class called Cooking for One, but the teacher killed himself.” (Episode 5.6, “Gentleman’s Intermission”)',
    'Are you sure? Cause I took one of those “Which Gossip Girl are you?” quizzes, and it said I was the dad’s guitar.” (Episode 6.13, “Grandmentor”)',
    // possibly nsfw out of context
    // '“Why do you sound so surprised? I love America. Just because I think gay dudes should be allowed to adopt kids and we should all have hybrid cars doesn’t mean I don’t love America. [winks at camera]” (1.15, “Hardball”)',
    'My mom used to send me articles about how older virgins are considered good luck in Mexico.” (Episode 4.5, “Audition Day”)',
    'You wanna party? It’s $500 for kissing and $10,000 for snuggling; end of list.” (Episode 5.18, “Plan B”)',
    'I did Big Sister in college. That little girl taught me how to use tampons.” (Episode 4.2, “Into the Crevasse”)',
    '"’Cause living a lie will eat you up inside. Like that parasite I got from eating sushi on Amtrak.” (Episode 6.10, “Alexis Goodlooking and the Case of the Missing Whisky”)',
    'Did you really think I wouldn’t recognize my college futon, with its trademark absence of sex stains?” (Episode 5.19, “I Heart Connecticut”)',
    'Just embrace the fact that you are lucky enough to be a happily married man. I mean, I’m actually jealous of you. You’ve got stability, a great marriage, devoted kids. You know what I have? A Sims family that keeps getting murdered.” (Episode 4.15, “Don Geiss, America and Hope”)',
    'It doesn’t matter how long you’ve lived in New York. It’s still fun to look up and pretend all the buildings are giant severed robot penises.” (Episode 5.12, “Operation Righteous Cowboy Lightning”)',
    'Ugh, I hate January. It’s dark and freezing and everyone’s wearing bulky coats. You can do some serious subway flirting before you realize the guy is homeless.” (Episode 4.11, “Winter Madness”)',
    'For instance, Jack taught me not to wear tan slacks with a tan turtleneck. I thought it looked nice, but he, rightly, pointed out that it made me look like a giant condom.” (Episode 5.11, “Mrs. Donaghy”)',
    'I pretty much just do whatever Oprah tells me to.” (Episode 1.17, “The Fighting Irish”)',
    'Okay, fine, maybe I’m a little old-fashioned. I’m sorry I’m a real woman and not some over-sexed New York nympho like those sluts on Everybody Loves Raymond.” (Episode 5.5, “Reaganing”)',
    'If I have learned anything from my Sims family: When a child doesn’t see his father enough he starts to jump up and down, then his mood level will drop until he pees himself.” (Episode 3.21, “Mamma Mia”)',
    'Tracy took advantage of my white guilt, which is supposed to be used only for good, like overtipping and supporting Barack Obama.” (Episode 1.5, “Jack-Tor”)',
    'One of my New Year’s resolutions is to say “yes!” Yes to love, yes to life, yes to staying in more!” (Episode 5.11, “Mrs. Donaghey”)',
    'You can’t be gay for just one person. Unless you’re a lady, and you meet Ellen.” (Episode 2.7, “Cougars”)',
    'Trying on jeans is my favorite thing! Maybe later I can get a pap smear from an old male doctor.” (Episode 5.7, “Brooklyn Without Limits”)',
    'I don’t care. I’ll start my own group. Rejection from society is what created X-Men!” (Episode 4.16, “Floyd”)',
    'Deviousness? I guess two can play at that game. Just like most games.” (Episode 7.5, “There’s No I in America”)',
    'And now I am heading home for a nooner—which is what I like to call having pancakes for lunch.” (Episode 6.2, “Idiots Are People Two!”)',
    'You know what Mr. Bag? I will have a nice day! I”m gonna hang you in my kitchen! And fill you with other bags! YOU WILL EAT YOUR FAMILY!” (Episode 5.22, “Everything Sunny All the Time Always”)',
    'I want to roll my eyes right now but the doctor said if I keep doing it, my ocular muscles might spasm and eject my eyeballs.” (Episode 5.16, “TGS Hates Women”)',
    'You know I can’t wear green, Jenna! The Clinique lady says I have witch undertones.” (Season 7.1, “The Beginning of the End”)',
    'I don’t need anyone. Because I can do every single thing that a person in a relationship can. Everything. Even zip up my own dress. You know, there are some things that are actually harder to do with two people. Such as monologues.” (Episode 4.13, “Anna Howard Shaw Day”)',
    'You are my heroine! And by heroine I mean lady hero. I don’t want to inject you and listen to jazz.” (Episode 2.4, “Rosemary’s Baby”)',
    'Really? I already have a drink. Do you think he’d buy me mozzarella sticks?” (Episode 1.8, “The Break up”)',
    'I wanna punch you in the face so bad right now.', // lol
  ];
  callback.say(target, li[Math.floor(Math.random() * li.length)]);
};
