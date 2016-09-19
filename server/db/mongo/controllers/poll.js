import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import Poll from '../models/poll';

export function getPolls(req, res) {
  Poll.find().sort('-dateAdded').exec((err, polls) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ polls });
  });
}

export function getUserPolls(req, res) {
  Poll.find({userId: req.query.ID}).sort('-dateAdded').exec((err, polls) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ polls });
  });
}

export function addPoll(req, res) {
  if (!req.body.name || !req.body.title) {
    res.status(403).end();
  }

  const newPoll = new Poll(req.body);

  // Let's sanitize inputs
  newPoll.title = sanitizeHtml(newPoll.title);
  newPoll.name = sanitizeHtml(newPoll.name);
  newPoll.userId = sanitizeHtml(newPoll.userId);
  newPoll.options.forEach((obj) => {
    const rObj = {};
    rObj.option = sanitizeHtml(obj.option);
    rObj.votes = sanitizeHtml(obj.votes);
    return rObj;
  });

  newPoll.slug = slug(newPoll.title.toLowerCase(), { lowercase: true });
  newPoll.cuid = cuid();
  newPoll.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getPoll(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Poll.findOne({ cuid: newCuid }).exec((err, poll) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ poll });
  });
}

export function deletePoll(req, res) {
  const pollId = req.body.pollId;
  Poll.findById(pollId).exec((err, poll) => {
    if (err) {
      res.status(500).send(err);
    }

    poll.remove(() =>
      res.status(200).end()
    );
  });
}

export function vote(req, res) {
  const pollId = req.body.pollId;
  const optionId = req.body.optionId;
  const userId = req.body.userId;
  const userIp = req.ip;
  Poll.findById(pollId, (err, poll) => {
    if (err) {
      console.log(err);
    }
    const option = poll.options.id(optionId);
    option.votes += 1;
    if (userId) {
      poll.authVotes.push(userId);
    } else {
      poll.ipVotes.push(userIp);
    }
    poll.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).end();
    });
  });
}

export default {
  getPolls,
  getUserPolls,
  addPoll,
  getPoll,
  deletePoll,
  vote
};
