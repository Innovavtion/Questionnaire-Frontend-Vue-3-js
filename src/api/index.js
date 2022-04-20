import instance from "./instance.js";

import authModule from "./auth.js"
import pollsModule from "./polls.js"
import usersModule from "./users.js"
import pollModule from "./poll.js"

export default {
    auth: authModule(instance),
    polls: pollsModule(instance),
    users: usersModule(instance),
    poll: pollModule(instance)
}