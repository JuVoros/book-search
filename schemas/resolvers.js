const { User } = require("../models");
const { signToken } = require("../server/utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      return User.findOne(context);
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Incorrect Email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input, token }) => {
      return User.findOneAndUpdate(
        { token: token },
        { $addToSet: { savedBooks: input } },
        { new: true }
      );
    },

    removeBook: async (parent, { bookId, token }) => {
      return User.findOneAndUpdate(
        { token: token },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
