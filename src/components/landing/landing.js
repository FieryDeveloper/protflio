import Image from 'next/image';
import React, { useContext } from 'react';
import {
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaTwitter
} from 'react-icons/fa';
import Typed from 'react-typed';
import { ThemeContext } from '../../contexts/theme-context';
import { headerData } from '../../data/header-data';
import { socialsData } from '../../data/socials-data';
import styles from '../../styles/landing.module.css';
import Link from '../link';

function Landing() {
    const { theme, drawerOpen } = useContext(ThemeContext);

    return (
        <div className={styles.landing} style={{
            backgroundColor: theme.quaternary
        }}>
            <div className={styles.landingContainer}>
                <div
                    className={styles.landingContainerLeft}
                    style={{ backgroundColor: theme.quaternary }}
                >
                    <div className={styles.lclContent}>
                        {socialsData.linkedIn && (
                            <a
                                href={socialsData.linkedIn}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaLinkedin
                                    className={styles.landingSocial}
                                    style={{ color: theme.primary }}
                                    aria-label='LinkedIn'
                                />
                            </a>
                        )}
                        {socialsData.github && (
                            <a
                                href={socialsData.github}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaGithub
                                    className={styles.landingSocial}
                                    style={{ color: theme.primary }}
                                    aria-label='GitHub'
                                />
                            </a>
                        )}
                        {socialsData.twitter && (
                            <a
                                href={socialsData.twitter}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaTwitter
                                    className={styles.landingSocial}
                                    style={{ color: theme.primary }}
                                    aria-label='Twitter'
                                />
                            </a>
                        )}
                        {socialsData.facebook && (
                            <a
                                href={socialsData.facebook}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaFacebook
                                    className={styles.landingSocial}
                                    style={{ color: theme.primary }}
                                    aria-label='facebook'
                                />
                            </a>
                        )}
                    </div>
                </div>
                <Image
                    src={headerData.image}
                    alt=''
                    width={350}
                    height={350}
                    className={styles.landingImg}
                    style={{
                        opacity: `${drawerOpen ? '0' : '1'}`,
                        borderColor: theme.primary,
                    }}
                />
                <div
                    className={styles.landingContainerRight}
                    style={{ backgroundColor: theme.secondary }}
                >
                    <div
                        className={styles.lcrContent}
                        style={{ color: theme.tertiary }}
                    >
                        {/* <h6 style={{ color: theme.primary }}>{headerData.title}</h6> */}
                        <h1>{headerData.name}</h1>
                        <Typed
                            strings={[
                                'Backend Developer',
                                'Frontend Developer',
                                'Fullstack Developer']}
                            typeSpeed={40}
                            backSpeed={50}
                            className={styles.typedHeader}
                            style={{ color: theme.primary, fontSize: '20px' }}
                            loop
                        />
                        <p>{headerData.desciption}</p>

                        <div className={styles.lcrButtonContainer}>
                            {headerData.resumePdf && (
                                <a
                                    href={headerData.resumePdf}
                                    download='resume'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <button
                                        className="sm:w-[180px] text-[#1D9BF0] 
                                        rounded-[30px] no-underline	w-36 text-base 
                                        font-medium h-12 border-[3px] border-[#1D9BF0] 
                                        transition duration-100 ease-out 
                                        hover:bg-[#8B98A5] hover:text-[#15202B]
                                         hover:border-[#8B98A5] "
                                    >
                                        Download CV
                                    </button>
                                </a>
                            )}
                            <Link
                                href='/#contacts'
                            >
                                <button className="sm:w-[180px] bg-[#1D9BF0] 
                                text-[#15202B] rounded-[30px] no-underline	
                                w-36 text-base font-medium h-12 border-[3px]
                                 border-[#1D9BF0] transition duration-100 
                                 ease-out hover:bg-[#8B98A5] hover:text-[#15202B]
                                  hover:border-[#8B98A5] hidden sm:block "
                                >
                                    Contact


                                      
                                </button>
                            </Link>
                        </div>
                                      Code:
                                      Backend:
                                      Controllers:
                                      auth.controller.js:
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { name, username, password, confirmPassword, gender, age, profession, income } = req.body;

		// Check if passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// Check if username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Generate profile picture URL based on gender
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		// Create new user
		const newUser = new User({
			name,
			username,
			password: hashedPassword,
			gender,
			profilePictureUrl: gender === "male" ? boyProfilePic : girlProfilePic,
			age,
			profession,
			income,
			country: null,
			state: null,
			city: null,
			virtualCurrency: 0,
			financialLiteracy: 0,
			badge: [],
			phoneNumber: null,
			role: 'User',
			financialGoals: null,
			educationLevel: null,
			address: null,
			lastLogin: null
		});

		// Save the new user and generate token
		await newUser.save();
		generateTokenAndSetCookie(newUser._id, res);

		// Send response
		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			username: newUser.username,
			profilePictureUrl: newUser.profilePictureUrl,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		const updatedData = req.body;
		try {
			const updatedUser = await User.findOneAndUpdate(
				{ username: username },
				{ $set: updatedData },
				{ new: true }
			);
	
			if (!updatedUser) {
				return res.status(404).send('User not found');
			}
	
			res.send(updatedUser);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
}


                                      

                </div>
            </div>
        </div >
    );
}

export default Landing;

chores.controller.js:
import verifySecretKey from "../middleware/verifySecretkeychores.js";
import User from "../models/user.model.js";
import Chore from "../models/chore.model.js";
import bcrypt from "bcryptjs";

export const generateSecretKey = async (req, res) => {
  try {
    const { userId, secretKey } = req.body;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the secret key
    const hashedSecretKey = await bcrypt.hash(secretKey, 10);

    // Update the user with the hashed secret key
    user.parentSecretKey = hashedSecretKey;
    await user.save();

    res
      .status(200)
      .json({ message: "Secret key generated and stored successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addChore = async (req, res) => {
  try {
    const { userId, description, addedByParent, secretKey } = req.body;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify if the request is made by a parent and validate the secret key if so
    if (addedByParent) {
      if (!secretKey) {
        return res
          .status(400)
          .json({ message: "Secret key required for parent-added chores" });
      }

      req.body.secretKey = secretKey;
      verifySecretKey(req, res, async () => {
        const chore = new Chore({
          userId,
          description,
          addedByParent,
          addedBy: user._id,
        });

        await chore.save();
        res.status(201).json(chore);
      });
    } else {
      const chore = new Chore({
        userId,
        description,
        addedByParent,
        addedBy: user._id,
      });

      await chore.save();
      res.status(201).json(chore);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const completeChore = async (req, res) => {
  try {
    const { choreId } = req.params;
    const {userId, secretKey } = req.body;
    const user = await User.findById(userId);
    // Find the existing chore
    const chore = await Chore.findById(choreId);
    if (!chore) {
      return res.status(404).json({ message: "Chore not found" });
    }

    // Verify if the chore is added by a parent and validate the secret key if so
    if (chore.addedByParent) {
      if (!secretKey) {
        return res.status(400).json({
          message: "Secret key required for completing parent-added chores",
        });
      }

      req.body.secretKey = secretKey;
      verifySecretKey(req, res, async () => {
        chore.isCompleted = true;
        chore.dateCompleted = new Date();
        user.virtualCurrency += 10;
        await user.save();
        await chore.save();
        res.json(chore);
      });
    } else {
      chore.isCompleted = true;
      chore.dateCompleted = new Date();
      user.virtualCurrency += 5;
      await chore.save();
      await user.save();
      res.json(chore);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getChores = async (req, res) => {
  try {
    const { userId } = req.params;
    const chores = await Chore.find({ userId });
    res.json(chores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChore = async (req, res) => {
  try {
    const { choreId } = req.params;
    const chore = await Chore.findById(choreId);
    if (!chore) {
      return res.status(404).json({ message: "Chore not found" });
    }
    if (chore.isCompleted) {
      return res
        .status(400)
        .json({ message: "Cannot delete a completed chore" });
    }
    await chore.remove();
    res.json({ message: "Chore deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

expense.controller.js:

import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";
import { calculatePoints } from "../utils/calculatePoints.js";
const updateMonthlySavings = async (userId, amount, date, isIncome = true) => {
  const user = await User.findById(userId);
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  const amountToUpdate = isIncome ? amount : -amount;

  // Check if there is already an entry for the specific month and year
  let monthlySavingsEntry = user.monthlySavings.find(
    (saving) => saving.month === month && saving.year === year
  );

  if (monthlySavingsEntry) {
    // Update the existing entry
    monthlySavingsEntry.amount += amountToUpdate;
  } else {
    // Add a new entry
    user.monthlySavings.push({ month, year, amount: amountToUpdate });
  }

  await user.save();
};

export const addExpense = async (req, res) => {
  try {
    const { userId, amount, category, necessityPercentage, description } =
      req.body;
    const date = new Date();

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.virtualCurrency+=necessityPercentage/10;
    const expense = new Expense({
      userId,
      amount,
      category,
      necessityPercentage,
      description,
      date,
    });
    await user.save();
    await expense.save();

    // Update user's monthly savings
    
    await updateMonthlySavings(userId, amount, date, false);

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update user's monthly savings
    await updateMonthlySavings(
      expense.userId,
      -expense.amount,
      expense.date,
      false
    );

    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, necessityPercentage, description } = req.body;

    // Find the existing expense
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Get the old amount for adjusting the savings
    const oldAmount = expense.amount;

    // Update the expense details
    expense.amount = amount;
    expense.category = category;
    expense.necessityPercentage = necessityPercentage;
    expense.description = description;

    await expense.save();

    const date = new Date(expense.date);
    await updateMonthlySavings(expense.userId, -oldAmount, date, false); // Remove old amount
    await updateMonthlySavings(expense.userId, amount, date, false); // Add new amount

    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getLeadeboard = async (req, res) => {
  try {
    const users = await User.find();
    const leaderboard = await Promise.all(users.map(async (user) => {
      const expenses = await Expense.find({ userId: user._id });
      const points = calculatePoints(expenses);
      return {
        username: user.username,
        points: points,
        profilePictureUrl: user.profilePictureUrl,
        financialLiteracy: user.financialLiteracy,
        profession: user.profession
      };
    }));

    // Sort the leaderboard by points in descending order
    leaderboard.sort((a, b) => b.points - a.points);

    // Split leaderboard into competitions
    const competitions = [];
    for (let i = 0; i < 5; i++) {
      competitions.push({
        competition: `Competition ${i + 1}`,
        users: leaderboard.slice(i * 5, (i + 1) * 5)
      });
    }

    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

extras.controllers.js:

import User from '../models/user.model.js';
export const userDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

income.controller.js:
import express from "express";
import User from "../models/user.model.js";
import Income from "../models/income.model.js";

const updateMonthlySavings = async (userId, amount, date, isIncome = true) => {
  const user = await User.findById(userId);
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  const amountToUpdate = isIncome ? amount : -amount;

  // Check if there is already an entry for the specific month and year
  let monthlySavingsEntry = user.monthlySavings.find(
    (saving) => saving.month === month && saving.year === year
  );

  if (monthlySavingsEntry) {
    // Update the existing entry
    monthlySavingsEntry.amount += amountToUpdate;
  } else {
    // Add a new entry
    user.monthlySavings.push({ month, year, amount: amountToUpdate });
  }

  await user.save();
};

export const addIncome = async (req, res) => {
  try {
    const { userId, amount, source, description } = req.body;
    const date = new Date();

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const income = new Income({
      userId,
      amount,
      source,
      description,
    });
    user.virtualCurrency += 5;
    await user.save();
    await income.save();

    // Update user's monthly savings
    await updateMonthlySavings(userId, amount, date, true);

    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const { userId } = req.params;
    const incomes = await Income.find({ userId });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Update user's monthly savings
    await updateMonthlySavings(
      income.userId,
      -income.amount,
      income.date,
      true
    );

    res.json({ message: "Income deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, source, description } = req.body;
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    await updateMonthlySavings(
      income.userId,
      -income.amount,
      income.date,
      true
    );
    await updateMonthlySavings(income.userId, amount, income.date, true);
    income.amount = amount;
    income.source = source;
    income.description = description;
    await income.save();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

quiz.controller.js:

import { Question, Response } from "../models/quiz.model.js";
import User from "../models/user.model.js";

export const quizQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.send(questions);
    console.log("here");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const submitQuiz = async (req, res) => {
  const results = req.body;

  // Example: Logging results to console (you can process and store these results as needed)
  console.log("Received quiz results:", results);
  const userId = results.userId;
  // console.log(userId);
  const curruser = await User.findById(userId);
  
  curruser.score += results.score;
  curruser.save();


  // Response back to the client
  res.json({ message: "Results submitted successfully", results });
};

middleware:

protectroute.js

    import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;

verifysecretchors.js:


import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const verifySecretKey = async (req, res, next) => {
  const { userId, secretKey } = req.body;

  // Fetch the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the provided secret key matches the stored hashed secret key
  const isMatch = await bcrypt.compare(secretKey, user.parentSecretKey);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid secret key" });
  }

  next();
};

export default verifySecretKey;


models:

chore.model.js:

import mongoose from 'mongoose';

const choreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  addedByParent: {
    type: Boolean,
    default: false
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateCompleted: {
    type: Date
  }
});

export default mongoose.model('Chore', choreSchema);

expense.model.js:
// expenseSchema.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }, 
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  necessityPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  description: {
    type: String,
    default: null
  }
});

export default mongoose.model('Expense', expenseSchema);

income.model.js:
import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
});

export default mongoose.model("Income", incomeSchema);

quiz.model.js:


import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  options: [String],
  correctAnswer: String
});

const responseSchema = new mongoose.Schema({
  userId: String,
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedAnswer: String,
      isCorrect: Boolean
    }
  ],
  score: Number
});

export const Question = mongoose.model("Question", questionSchema);
export const Response = mongoose.model("Response", responseSchema);

user.model.js:



import mongoose from 'mongoose';

const monthlySavingsSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  }
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  profession: {
    type: String,
    enum: ['Job', 'Student'],
    required: true
  },
  income: {
    type: Number,
    default: null
  },
  virtualCurrency: {
    type: Number,
    default: 0
  },
  financialLiteracy: {
    type: Number,
    default: 0
  },
  badge: {
    type: [String],
    default: []
  },
  phoneNumber: {
    type: String,
    default: null
  },
  profilePictureUrl: {
    type: String,
    default: null
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  },
  financialGoals: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  educationLevel: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: null
  },
  monthlySavings: {
    type: [monthlySavingsSchema],
    default: []
  },
  parentSecretKey: {
    type: String,
    default: null
  }
});

export default mongoose.model('User', userSchema);

routes:
auth:
auth.routes.js

    import express from "express";

import { login, logout, signup, updateUser } from "../../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/updateUser/:userId", updateUser);

export default router;


choresmanagement

    chors.routes.js

        import express from 'express';

import { addChore, completeChore, getChores, generateSecretKey, deleteChore} from '../../controllers/chores.controller.js';

const router = express.Router();

router.post('/generateSecretKey', generateSecretKey);
router.post('/add', addChore);
router.get('/:userId', getChores);
router.put('/:choreId', completeChore);
router.delete('/:choreId', deleteChore);

export default router;


expensetracker

    expenseroutes.js

        import express from 'express';

import { addExpense, deleteExpense, getExpenses, updateExpense, getLeadeboard } from '../../controllers/expense.controller.js';

const router = express.Router();

router.post('/add', addExpense);
router.get('/:userId', getExpenses);
router.delete('/:id', deleteExpense);
router.put('/:id', updateExpense);
router.get('/get/leaderboard', getLeadeboard);
export default router;

incomeroutes.js

    import express from "express";
const router = express.Router();

import { addIncome, getIncomes, deleteIncome, updateIncome } from "../../controllers/income.controller.js";

router.post("/add", addIncome);
router.get("/:userId", getIncomes);
router.delete("/:id", deleteIncome);
router.put("/:id", updateIncome);


export default router;


extras

    user routes.js

        import express from 'express';
import {userDetails, getAllUsers} from '../../controllers/extras.controller.js';

const router = express.Router();
router.get('/:userId', userDetails);
router.get('/alluser/search', getAllUsers)

export default router;

quiz:

quiz.routes.js:

import express from "express";

import { quizQuestions, submitQuiz } from "../../controllers/quiz.controller.js";
import protectRoute from "../../middleware/protectRoute.js";

const router = express.Router();

router.get("/questions" ,quizQuestions);
router.post("/submit", submitQuiz);


export default router;

utils:

calculatepoints:
export const calculatePoints = (expenses) => {
  return expenses.reduce((total, expense) => {
    const randomFactor = Math.random();
    return total + expense.amount * randomFactor;
  }, 0);
};

generatetoken.js:

import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, 
		sameSite: "strict", 
		secure: process.env.NODE_ENV !== "development",
	});
};

export default generateTokenAndSetCookie;

index.js:


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/auth.routes.js";
import quizRoutes from "./routes/quiz/quiz.routes.js";
import expenseRoutes from "./routes/expenseTracker/expense.routes.js";
import incomeRoutes from "./routes/expenseTracker/income.routes.js";
import choreRoutes from "./routes/choresManagement/chores.routes.js"
import extrasRoutes from "./routes/extras/user.routes.js"
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/chore", choreRoutes);
app.use("/api/extras", extrasRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("connected to mongodb on", process.env.DB_URI);
  app.listen(port, () => {
    console.log(` listening on port ${port}`);
  });
});

package.json


    {
  "name": "finlit",
  "version": "1.0.0",
  "description": "financial literacy backend",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Team Finlit Wizards",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.4"
  }
}


frontend:

public :
index.html

    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>


          src

              components

                  expense

                      chartcomponent.jsx

                          import React from "react";
import { Pie } from "react-chartjs-2";

const ChartComponent = ({ data, title }) => {
  // Custom options to adjust the size of the Pie chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // This ensures the chart fits within its container
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Pie data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChartComponent;

expense.jsx:


import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ChartComponent from './ChartComponent'; // Import your newly created ChartComponent
import 'chart.js/auto'; // Ensure Chart.js auto-registers components

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    necessityPercentage: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/expense/${userId}`)
        .then(response => response.json())
        .then(data => setExpenses(data))
        .catch(error => console.error('Error fetching expenses:', error));
    }
  }, [userId]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoint = editExpenseId ? `http://localhost:5000/api/expense/${editExpenseId}` : 'http://localhost:5000/api/expense/add';
    const method = editExpenseId ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      if (editExpenseId) {
        setExpenses(expenses.map(exp => (exp._id === editExpenseId ? data : exp)));
        setEditExpenseId(null);
      } else {
        setExpenses([...expenses, data]);
      }

      setFormData({
        amount: '',
        category: '',
        necessityPercentage: '',
        description: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding/updating expense:', error);
      setError('Internal Server Error');
    }
  };

  // Handle edit expense
  const handleEdit = (expense) => {
    setFormData({
      amount: expense.amount,
      category: expense.category,
      necessityPercentage: expense.necessityPercentage,
      description: expense.description,
    });
    setEditExpenseId(expense._id);
    setIsModalOpen(true);
  };

  // Handle delete expense
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expense/${id}`, {
        method: 'DELETE',
      });

      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Toggle modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setFormData({
        amount: '',
        category: '',
        necessityPercentage: '',
        description: '',
      });
      setEditExpenseId(null);
    }
  };

  // Prepare data for pie chart by category
  const getCategoryData = () => {
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ],
    };
  };

  // Prepare data for pie chart by necessity
  const getNecessityData = () => {
    const necessityData = { Necessary: 0, Unnecessary: 0 };

    expenses.forEach(expense => {
      if (expense.necessityPercentage > 50) {
        necessityData.Necessary += expense.amount;
      } else {
        necessityData.Unnecessary += expense.amount;
      }
    });

    return {
      labels: ['Necessary', 'Unnecessary'],
      datasets: [
        {
          data: [necessityData.Necessary, necessityData.Unnecessary],
          backgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <div>
        <h2 className="text-xl font-bold mb-4">Your Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense._id} className="mb-4 p-4 border border-gray-300 rounded">
              <div className="flex justify-between items-center">
                <button
                  className="flex-grow text-left"
                  onClick={() => setExpenses(expenses.map(exp => exp._id === expense._id ? { ...exp, expanded: !exp.expanded } : exp))}
                >
                  <div className="flex justify-between items-center">
                    <span className="flex-1">Amount: {expense.amount}</span>
                    <span className="flex-1">Category: {expense.category}</span>
                    <span className="flex-1">Necessity Percentage: {expense.necessityPercentage}</span>
                  </div>
                </button>
                <div className="flex">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {expense.expanded && (
                <div className="mt-2">
                  <p>Description: {expense.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add Expense
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="Expense Form">
        <h2 className="text-xl font-bold mb-4">{editExpenseId ? 'Update Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="necessityPercentage" className="block mb-2">Necessity Percentage</label>
            <input
              type="number"
              id="necessityPercentage"
              name="necessityPercentage"
              value={formData.necessityPercentage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editExpenseId ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>
        <button onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </Modal>

      <ChartComponent title="Expenses by Category" data={getCategoryData()} />
      <ChartComponent title="Necessary vs Unnecessary Expenses" data={getNecessityData()} />
    </div>
  );
};

export default ExpensePage;


expensepage.jsx:

import React from 'react'
import Expense from "./Expense";
import IncomePage from './Income';

const ExpensePage = () => {
  return (
    <div className='flex justify-center space-x-40'>
      <Expense/>
      <IncomePage/>
    </div>
  )
}

export default ExpensePage


    income.jsx

        import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing this ensures Chart.js auto-registers components
import ChartComponent from './ChartComponent';

const IncomePage = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    source: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editIncomeId, setEditIncomeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:5000/api/income/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIncomes(data);
        setError(null); // Clear any previous error
      })
      .catch(error => {
        console.error('Error fetching incomes:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoint = editIncomeId ? `http://localhost:5000/api/income/${editIncomeId}` : 'http://localhost:5000/api/income/add';
    const method = editIncomeId ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      if (editIncomeId) {
        setIncomes(incomes.map(inc => (inc._id === editIncomeId ? data : inc)));
        setEditIncomeId(null);
      } else {
        setIncomes([...incomes, data]);
      }

      setFormData({
        amount: '',
        source: '',
        description: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding/updating income:', error);
      setError('Internal Server Error');
    }
  };

  const handleEdit = (income) => {
    setFormData({
      amount: income.amount,
      source: income.source,
      description: income.description,
    });
    setEditIncomeId(income._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/income/${id}`, {
        method: 'DELETE',
      });

      setIncomes(incomes.filter(inc => inc._id !== id));
      setLoading(false)
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setFormData({
        amount: '',
        source: '',
        description: '',
      });
      setEditIncomeId(null);
    }
  };

  const getIncomeChartData = () => {
    const incomeTotal = incomes.reduce((total, income) => total + income.amount, 0);
    const data = incomes.map(income => ({
      label: income.source,
      value: (income.amount / incomeTotal) * 100,
    }));

    return {
      labels: data.map(item => item.label),
      datasets: [
        {
          data: data.map(item => item.value.toFixed(2)),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ],
    };
  };

  return loading?<> Loading...</>:(
    <div>
      <h1 className="text-2xl font-bold mb-4">Incomes</h1>
      <div>
        <h2 className="text-xl font-bold mb-4">Your Incomes</h2>
        <ul>
          {incomes.map(income => (
            <li key={income._id} className="mb-4 p-4 border border-gray-300 rounded">
              <div className="flex justify-between items-center">
                <button
                  className="flex-grow text-left"
                  onClick={() => setIncomes(incomes.map(inc => inc._id === income._id ? { ...inc, expanded: !inc.expanded } : inc))}
                >
                  <div className="flex justify-between items-center">
                    <span className="flex-1">Amount: {income.amount}</span>
                    <span className="flex-1">Source: {income.source}</span>
                  </div>
                </button>
                <div className="flex">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(income)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(income._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {income.expanded && (
                <div className="mt-2">
                  <p>Description: {income.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add Income
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="Income Form">
        <h2 className="text-xl font-bold mb-4">{editIncomeId ? 'Update Income' : 'Add Income'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editIncomeId ? 'Update Income' : 'Add Income'}
          </button>
        </form>
        <button onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </Modal>

      <div className="mt-8">
        <ChartComponent data ={getIncomeChartData()} title="Income Distribution" />
      </div>
    </div>
  );
};

export default IncomePage;


export.js

    import ExpensePage from "./ExpensePage";

export { ExpensePage}


Landing

    customerreview.jsx
        import React from 'react';

const CustomerReview = () => {
  return (
    <div className="flex items-center justify-center bg-gray-800 text-white p-10 m-5 rounded-md">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold mb-2">100k</div>
        <div className="text-xl">satisfied customers</div>
      </div>
    </div>
  );
}

export default CustomerReview;

features.jsx

    import React from 'react';

const FeaturesSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-10 m-5 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        <h2 className="text-3xl font-bold mb-6">Save money and become carbon neutral with Finlit</h2>
        <button className="bg-green-500 px-6 py-3 rounded-full text-xl font-semibold">Explore all features</button>
      </div>
    </div>
  );
}

export default FeaturesSection;

herosection.jsx

    
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-10 m-5 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="text-5xl font-bold mb-6">Building financial security easy as playing a game!</h1>
        <div>
          <button className="bg-green-500 px-6 py-3 rounded-full text-xl font-semibold mr-4">See video</button>
          <button className="bg-blue-500 px-6 py-3 rounded-full text-xl font-semibold">Try now</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;


landing.jsx


    import React from "react";
import Navbar from "../Navbar";
import HeroSection from './HeroSection';
import CustomerReview from './CustomerReview';
import FeaturesSection from './Features';

const Landing = () => {
  return (
    <>
    <div className="flex bg-gradient-to-r from-gray-600 to-gray-800 h-lvh">
      <div className="flex-1">

      <HeroSection />
      <div className="flex w-full justify-around">

      <CustomerReview />
      <FeaturesSection />
      </div>
      </div>
      <div className="flex-1 text-8xl">Chatbot</div>
    </div>
    </>
  );
};

export default Landing;


login.jsx


    import React, { useEffect, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  useEffect(()=> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Redirect to the dashboard
      window.location.href = '/expense';
    }
  }, []
  );


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }
      localStorage.setItem('userId', data._id);
      // setUser(data);
      // Handle successful login (e.g., redirect or show a success message)
      console.log('Login successful', data);
      
      window.location.reload();
    } catch (error) {
      console.error('Error during login', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


navbar.js

    import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, loading, error } = useContext(UserContext);

  return (
    <nav className="flex justify-between items-center p-6 bg-gray-900 text-white">
      <div className="text-xl font-bold">Finlet</div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/expense">Expense Tracker</Link>
        </li>
        <li>
          <Link to="/">Recommendation</Link>
        </li>
        <li>
          <Link to="/">Chatbot</Link>
        </li>
        {loading ? (
          <li>Loading...</li>
        ) : error ? (
          <li>Error loading user data</li>
        ) : user ? (
          <li>Currency: {user.virtualCurrency}</li>
        ) : (
          <>
            <li>
              <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">Sign up</Link>
            </li>
            <li>
              <Link to ="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <Link onClick={()=>{
                localStorage.removeItem('userId');
                window.location.href = '/';
            }} className="bg-red-500 px-4 py-2 rounded">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

quiz.jsx


    import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "../contexts/UserContext";
import Modal from 'react-modal';

// Set the app element for accessibility purposes
Modal.setAppElement('#root');

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/quiz/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data[0].questions);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  }, []);

  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    const results = questions.map((question, index) => ({
      question: question.question,
      correctAnswer: question.correctAnswer,
      userAnswer: userAnswers[index] || '',
      isCorrect: question.correctAnswer === (userAnswers[index] || ''),
    }));

    const score = results.reduce((acc, result) => acc + (result.isCorrect ? 1 : 0), 0);

    setResults({ score, results });

    fetch('http://localhost:5000/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ results, score, userId: user._id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Results submitted successfully:', data);
      })
      .catch(error => {
        console.error('There was an error submitting the results!', error);
      });
  };

  const closeModal = () => {
    setResults(null);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl mb-2">{question.question}</h2>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, idx) => {
              const isSelected = userAnswers[index] === option;
              const optionBg = isSelected ? 'bg-blue-300' : 'bg-gray-200';
              const optionText = isSelected ? 'text-white' : 'text-black';

              return (
                <div key={idx} className={`p-4 rounded ${optionBg} ${optionText}`}>
                  <label className="cursor-pointer flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                      className="mr-2"
                      checked={isSelected}
                    />
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {results && (
        <Modal
          isOpen={!!results}
          onRequestClose={closeModal}
          contentLabel="Results Modal"
          className="bg-white p-8 rounded shadow-lg mx-auto my-4 max-w-2xl"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold">Your Score: {results.score} / {questions.length}</h2>
          <ul className="mt-4">
            {results.results.map((result, index) => (
              <li key={index} className="mb-2">
                <p className="text-lg">{result.question}</p>
                <p className={`text-sm ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                  Your answer: {result.userAnswer} (Correct answer: {result.correctAnswer})
                </p>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Quiz;


signup.jsx

    import React, { useState,useEffect } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    profession: '',
    income: '',
  });

  useEffect(()=> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Redirect to the dashboard
      window.location.href = '/expense';
    }
  }, []
  );

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }
      localStorage.setItem('userId', data._id);

      // Handle successful signup (e.g., redirect or show a success message)
      console.log('Signup successful', data);
    } catch (error) {
      console.error('Error during signup', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
              Profession *
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your profession"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
              Income *
            </label>
            <input
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your income"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


export.js


    import Login from "./Login";
import SignUp from "./Signup";
import Quiz from "./Quiz";
import { ExpensePage } from "./Expense/export";
import Landing from "./Landing/Landing";

export { Login, SignUp, Quiz, ExpensePage, Landing };



context

    usercontext.js

        import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const response = await fetch(`http://localhost:5000/api/extras/${userId}`);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching user data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);


    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};


pages

    addchoremodel.jsx

        import React, { useState } from 'react';

const AddChoreModal = ({ onClose, user, refreshChores }) => {
  const [description, setDescription] = useState('');
  const [isParent, setIsParent] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chore = {
      userId: user._id,
      description,
      date: new Date(),
      addedByParent: isParent,
      secretKey: isParent ? secretKey : null,
    };

    await fetch('http://localhost:5000/api/chore/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chore),
    });

    refreshChores((prev) => !prev); // Trigger a refresh
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Add Chore</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {user.age <= 16 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="isParent">Add as Parent</label>
              <input
                id="isParent"
                type="checkbox"
                checked={isParent}
                onChange={() => setIsParent(!isParent)}
                className="mr-2"
              />
            </div>
          )}
          {isParent && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="secretKey">Parent Secret Key</label>
              <input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Chore
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChoreModal;


choremanagement.js

    import React, { useState, useEffect } from 'react';
import AddChoreModal from './AddChoreModal';
import CompleteChoreModal from './CompleteChoreModal';
import GenerateSecretKeyModal from './GenerateSecretKeyModal.jsx';
import { useNavigate } from 'react-router-dom';

const ChoreManagement = () => {
  const [chores, setChores] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const [selectedChore, setSelectedChore] = useState(null);
  const [refreshChores, setRefreshChores] = useState(false);
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/extras/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('User data:', data);
        setUser(data);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chore/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched chores:', data);
        setChores(data);
      });
  }, [userId, refreshChores]);

  const handleAddChore = () => setShowAddModal(true);
  const handleCompleteChore = (chore) => {
    setSelectedChore(chore);
    setShowCompleteModal(true);
  };

  const handleGenerateSecretKey = () => setShowSecretKeyModal(true);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chore Dashboard</h1>
        <div>
          {user && user.age < 16 && (
            <button
              onClick={handleGenerateSecretKey}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
            >
              Generate Secret Key
            </button>
          )}
          <button
            onClick={handleAddChore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Chore
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-4">Today's Chores</h2>
        <ul>
          {chores
            .filter(chore => !chore.isCompleted && new Date(chore.dateAdded).toDateString() === new Date().toDateString())
            .map(chore => (
              <li key={chore._id} className="mb-2">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
                  <span>{chore.description}</span>
                  <button
                    onClick={() => handleCompleteChore(chore)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Mark as Complete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-xl mb-4">Missed Chores</h2>
        <ul>
          {chores
            .filter(chore => !chore.isCompleted && new Date(chore.dateAdded) < new Date())
            .map(chore => (
              <li key={chore._id} className="mb-2">
                <div className="flex justify-between items-center p-4 bg-red-100 rounded">
                  <span>{chore.description}</span>
                  <button
                    onClick={() => handleCompleteChore(chore)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Complete Now
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {showAddModal && <AddChoreModal onClose={() => setShowAddModal(false)} user={user} refreshChores={setRefreshChores} />}
      {showCompleteModal && <CompleteChoreModal onClose={() => setShowCompleteModal(false)} chore={selectedChore} user={user} refreshChores={setRefreshChores} />}
      {showSecretKeyModal && <GenerateSecretKeyModal onClose={() => setShowSecretKeyModal(false)} user={user} />}
    </div>
  );
};

export default ChoreManagement;


completechoremodal.jsx
import React, { useState } from 'react';

const CompleteChoreModal = ({ onClose, chore, user, refreshChores }) => {
  const [secretKey, setSecretKey] = useState('');

  const handleComplete = async () => {
    const body = {
      userId: user._id,
      secretKey: chore.addedByParent ? secretKey : null,
    };

    await fetch(`http://localhost:5000/api/chore/${chore._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    refreshChores((prev) => !prev); // Trigger a refresh
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Complete Chore</h2>
        {chore.addedByParent && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="secretKey">Parent Secret Key</label>
            <input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleComplete}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Complete Chore
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteChoreModal;



generate secretkey.jsx
import React, { useState } from "react";

const GenerateSecretKeyModal = ({ onClose, user }) => {
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/chore/generateSecretKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, secretKey }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Generate Secret Key</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="secretKey"
            >
              Secret Key
            </label>
            <input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateSecretKeyModal;


leaderboard.jsx

import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

export const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "http://localhost:5000/api/extras/alluser/search"
      );
      const data = await response.json();
      data.sort((a, b) => b.virtualCurrency - a.virtualCurrency);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const getCategory = (index) => {
    if (index < 3) return "diamond";
    if (index < 8) return "gold";
    if (index < 18) return "silver";
    return "bronze";
  };

  const categoryStyles = {
    diamond: "bg-gradient-to-r from-blue-400 to-blue-600",
    gold: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    silver: "bg-gradient-to-r from-gray-400 to-gray-600",
    bronze: "bg-gradient-to-r from-orange-400 to-orange-600",
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="p-2">Profile</th>
            <th className="p-2">Username</th>
            <th className="p-2">Score</th>
            <th className="p-2">Financial Literacy</th>
            <th className="p-2">Profession</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={`${categoryStyles[getCategory(index)]} text-white`}
            >
              <td className="p-2">
                <img
                  src={user.profilePictureUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.virtualCurrency}</td>
              <td className="p-2">{user.financialLiteracy}</td>
              <td className="p-2">{user.profession}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


expenseleaderboard.jsx

    // src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const categoryStyles = {
    0: 'bg-gradient-to-r from-blue-400 to-blue-600',
    1: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    2: 'bg-gradient-to-r from-gray-400 to-gray-600',
    3: 'bg-gradient-to-r from-orange-400 to-orange-600'
};

const ExpenseLeaderboard = () => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leaderboard');
                setCompetitions(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
            {competitions.map((competition, index) => (
                <div key={index} className={`${categoryStyles[index] || 'bg-gradient-to-r from-green-400 to-green-600'} text-white p-4 rounded-lg mb-4`}>
                    <h2 className="text-2xl font-semibold mb-2">{competition.competition}</h2>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th className="p-2">Profile</th>
                                <th className="p-2">Username</th>
                                <th className="p-2">Points</th>
                                <th className="p-2">Financial Literacy</th>
                                <th className="p-2">Profession</th>
                            </tr>
                        </thead>
                        <tbody>
                            {competition.users.map((user) => (
                                <tr key={user.username} className="border-b border-gray-200">
                                    <td className="p-2">
                                        <img src={user.profilePictureUrl} alt="Profile" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="p-2">{user.username}</td>
                                    <td className="p-2">{user.points.toFixed(2)}</td>
                                    <td className="p-2">{user.financialLiteracy}</td>
                                    <td className="p-2">{user.profession}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ExpenseLeaderboard;



routes


    outlet.js

        import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;


routes.js

    import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {SignUp,Login,Quiz,ExpensePage,Landing} from "../components/export";
import ChoreManagement from "../pages/ChoreManagement";
import MainLayout from "./Outlet";
import { Leaderboard } from "../pages/Leaderboard";
import ExpenseLeaderboard from "../pages/expenseLeaderboard";
// import TwineStory from "../components/TwineStory";

const Routerapp = () => (
  <div className="App">
    <Router>
      <Routes>
      <Route element={<MainLayout />}>
      <Route element={<Landing />} path="/" exact />
      <Route element={<Login />} path="/login" exact />
      <Route element={<SignUp />} path="/signup" exact />
      <Route element={<Quiz />} path="/quiz" exact />
      <Route element={<ExpensePage />} path="/expense" exact />
      <Route element={<ChoreManagement />} path="/choremanagement" exact />
      </Route>
      <Route element={<Leaderboard />} path="/leaderboard" exact />
      <Route element={<ExpenseLeaderboard />} path="/expenseleaderboard" exact />
      {/* <Route element={<TwineStory />} path="/story" exact /> */}
      </Routes>
    </Router>
  </div>
);

export default Routerapp;



app.css

.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


app.js

    import "./App.css";
import Route from "./routes/Routes";


function App() {
  return (
      <Route />
  );
}

export default App;


finlit.html

    <!DOCTYPE html>
<html class="init-no-js">
<head>
<meta charset="UTF-8" />
<title>Finlit</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<!--

SugarCube (v1.0.35): A free (gratis and libre) story format, based on TiddlyWiki.

Copyright © 2013–2016 Thomas Michael Edwards <tmedwards@motoslave.net>.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

-->
<script id="script-init" type="text/javascript">
if(!document.head||!document.querySelector||!document.addEventListener||!JSON||!Object.getPrototypeOf||!Object.freeze){document.documentElement.className="init-lacking";}else{document.documentElement.className="init-loading";
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)
},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec=/#.*$/,fc=/([?&])_=[^&]*/,gc=/^(.*?):[ \t]*([^\r\n]*)$/gm,hc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ic=/^(?:GET|HEAD)$/,jc=/^\/\//,kc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lc={},mc={},nc="*/".concat("*"),oc=a.location.href,pc=kc.exec(oc.toLowerCase())||[];function qc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rc(a,b,c,d){var e={},f=a===mc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function uc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:oc,type:"GET",isLocal:hc.test(pc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sc(sc(a,n.ajaxSettings),b):sc(n.ajaxSettings,a)},ajaxPrefilter:qc(lc),ajaxTransport:qc(mc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||oc)+"").replace(ec,"").replace(jc,pc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pc[1]&&h[2]===pc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pc[3]||("http:"===pc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rc(lc,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ic.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fc.test(d)?d.replace(fc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rc(mc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tc(k,v,f)),u=uc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vc=/%20/g,wc=/\[\]$/,xc=/\r?\n/g,yc=/^(?:submit|button|image|reset|file)$/i,zc=/^(?:input|select|textarea|keygen)/i;function Ac(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wc.test(a)?d(a,e):Ac(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ac(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ac(c,a[c],b,e);return d.join("&").replace(vc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zc.test(this.nodeName)&&!yc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xc,"\r\n")}}):{name:b.name,value:c.replace(xc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bc=0,Cc={},Dc={0:200,1223:204},Ec=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cc)Cc[a]()}),k.cors=!!Ec&&"withCredentials"in Ec,k.ajax=Ec=!!Ec,n.ajaxTransport(function(a){var b;return k.cors||Ec&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Dc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fc=[],Gc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hc)return Hc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ic=a.document.documentElement;function Jc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ic;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ic})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kc=a.jQuery,Lc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lc),b&&a.jQuery===n&&(a.jQuery=Kc),n},typeof b===U&&(a.jQuery=a.$=n),n});
/*! jQuery throttle / debounce - v1.1 - 3/7/2010 [http://benalman.com/projects/jquery-throttle-debounce-plugin/] | (c) 2010 "Cowboy" Ben Alman | Dual licensed under the MIT and GPL licenses. [http://benalman.com/about/license/] */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
/*! imagesLoaded PACKAGED v3.1.8 | MIT License */
(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
/*! UUID.js - Version: core-1.0-tme.object.forceBrowserRandom.1 | (c) 2012 LiosK | Licensed under the MIT License */
var UUID={};UUID.generate=function(){var a=UUID._gri,b=UUID._ha;return b(a(32),8)+"-"+b(a(16),4)+"-"+b(16384|a(12),4)+"-"+b(32768|a(14),4)+"-"+b(a(48),12)};UUID._gri=function(a){return 0>a?NaN:30>=a?0|UUID._random()*(1<<a):53>=a?(0|1073741824*UUID._random())+1073741824*(0|UUID._random()*(1<<a-30)):NaN};UUID._ha=function(a,b){for(var c=a.toString(16),d=b-c.length,e="0";0<d;d>>>=1,e+=e)d&1&&(c=e+c);return c};UUID._random=Math.random;
/*! lz-string-1.3.3-min.js | (c) 2013 Pieroxy | Licensed under a WTFPL license */
var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(e){if(e==null)return"";var t="";var n,r,i,s,o,u,a;var f=0;e=LZString.compress(e);while(f<e.length*2){if(f%2==0){n=e.charCodeAt(f/2)>>8;r=e.charCodeAt(f/2)&255;if(f/2+1<e.length)i=e.charCodeAt(f/2+1)>>8;else i=NaN}else{n=e.charCodeAt((f-1)/2)&255;if((f+1)/2<e.length){r=e.charCodeAt((f+1)/2)>>8;i=e.charCodeAt((f+1)/2)&255}else r=i=NaN}f+=3;s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+LZString._keyStr.charAt(s)+LZString._keyStr.charAt(o)+LZString._keyStr.charAt(u)+LZString._keyStr.charAt(a)}return t},decompressFromBase64:function(e){if(e==null)return"";var t="",n=0,r,i,s,o,u,a,f,l,c=0,h=LZString._f;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<e.length){u=LZString._keyStr.indexOf(e.charAt(c++));a=LZString._keyStr.indexOf(e.charAt(c++));f=LZString._keyStr.indexOf(e.charAt(c++));l=LZString._keyStr.indexOf(e.charAt(c++));i=u<<2|a>>4;s=(a&15)<<4|f>>2;o=(f&3)<<6|l;if(n%2==0){r=i<<8;if(f!=64){t+=h(r|s)}if(l!=64){r=o<<8}}else{t=t+h(r|i);if(f!=64){r=s<<8}if(l!=64){t+=h(r|o)}}n+=3}return LZString.decompress(t)},compressToUTF16:function(e){if(e==null)return"";var t="",n,r,i,s=0,o=LZString._f;e=LZString.compress(e);for(n=0;n<e.length;n++){r=e.charCodeAt(n);switch(s++){case 0:t+=o((r>>1)+32);i=(r&1)<<14;break;case 1:t+=o(i+(r>>2)+32);i=(r&3)<<13;break;case 2:t+=o(i+(r>>3)+32);i=(r&7)<<12;break;case 3:t+=o(i+(r>>4)+32);i=(r&15)<<11;break;case 4:t+=o(i+(r>>5)+32);i=(r&31)<<10;break;case 5:t+=o(i+(r>>6)+32);i=(r&63)<<9;break;case 6:t+=o(i+(r>>7)+32);i=(r&127)<<8;break;case 7:t+=o(i+(r>>8)+32);i=(r&255)<<7;break;case 8:t+=o(i+(r>>9)+32);i=(r&511)<<6;break;case 9:t+=o(i+(r>>10)+32);i=(r&1023)<<5;break;case 10:t+=o(i+(r>>11)+32);i=(r&2047)<<4;break;case 11:t+=o(i+(r>>12)+32);i=(r&4095)<<3;break;case 12:t+=o(i+(r>>13)+32);i=(r&8191)<<2;break;case 13:t+=o(i+(r>>14)+32);i=(r&16383)<<1;break;case 14:t+=o(i+(r>>15)+32,(r&32767)+32);s=0;break}}return t+o(i+32)},decompressFromUTF16:function(e){if(e==null)return"";var t="",n,r,i=0,s=0,o=LZString._f;while(s<e.length){r=e.charCodeAt(s)-32;switch(i++){case 0:n=r<<1;break;case 1:t+=o(n|r>>14);n=(r&16383)<<2;break;case 2:t+=o(n|r>>13);n=(r&8191)<<3;break;case 3:t+=o(n|r>>12);n=(r&4095)<<4;break;case 4:t+=o(n|r>>11);n=(r&2047)<<5;break;case 5:t+=o(n|r>>10);n=(r&1023)<<6;break;case 6:t+=o(n|r>>9);n=(r&511)<<7;break;case 7:t+=o(n|r>>8);n=(r&255)<<8;break;case 8:t+=o(n|r>>7);n=(r&127)<<9;break;case 9:t+=o(n|r>>6);n=(r&63)<<10;break;case 10:t+=o(n|r>>5);n=(r&31)<<11;break;case 11:t+=o(n|r>>4);n=(r&15)<<12;break;case 12:t+=o(n|r>>3);n=(r&7)<<13;break;case 13:t+=o(n|r>>2);n=(r&3)<<14;break;case 14:t+=o(n|r>>1);n=(r&1)<<15;break;case 15:t+=o(n|r);i=0;break}s++}return LZString.decompress(t)},compress:function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=LZString._f;for(d=0;d<e.length;d+=1){s=e.charAt(d);if(!Object.prototype.hasOwnProperty.call(r,s)){r[s]=f++;i[s]=true}o=u+s;if(Object.prototype.hasOwnProperty.call(r,o)){u=o}else{if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}r[o]=f++;u=String(s)}}if(u!==""){if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}}n=2;for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}while(true){h=h<<1;if(p==15){c+=v(h);break}else p++}return c},decompress:function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=LZString._f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a+=1){t[a]=a}l=0;h=Math.pow(2,2);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(n=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 2:return""}t[3]=d;f=u=d;while(true){if(m.index>m.string.length){return""}l=0;h=Math.pow(2,s);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(d=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 2:return u}if(r==0){r=Math.pow(2,s);s++}if(t[d]){o=t[d]}else{if(d===i){o=f+f.charAt(0)}else{return null}}u+=o;t[i++]=f+o.charAt(0);r--;f=o;if(r==0){r=Math.pow(2,s);s++}}}};if(typeof module!=="undefined"&&module!=null){module.exports=LZString}
/*! seedrandom.js v2.3.3 | (c) 2013 David Bau | Licensed under a BSD-style license */
!function(a,b,c,d,e,f,g,h,i){function j(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=r&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=r&f+1],c=c*d+h[r&(h[f]=h[g=r&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function k(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(k(a[c],b-1))}catch(f){}return d.length?d:"string"==e?a:a+"\0"}function l(a,b){for(var c,d=a+"",e=0;e<d.length;)b[r&e]=r&(c^=19*b[r&e])+d.charCodeAt(e++);return n(b)}function m(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),n(c)}catch(e){return[+new Date,a,(c=a.navigator)&&c.plugins,a.screen,n(b)]}}function n(a){return String.fromCharCode.apply(0,a)}var o=c.pow(d,e),p=c.pow(2,f),q=2*p,r=d-1,s=c["seed"+i]=function(a,f,g){var h=[],r=l(k(f?[a,n(b)]:null==a?m():a,3),h),s=new j(h);return l(n(s.S),b),(g||function(a,b,d){return d?(c[i]=a,b):a})(function(){for(var a=s.g(e),b=o,c=0;p>a;)a=(a+c)*d,b*=d,c=s.g(1);for(;a>=q;)a/=2,b/=2,c>>>=1;return(a+c)/b},r,this==c)};l(c[i](),b),g&&g.exports?g.exports=s:h&&h.amd&&h(function(){return s})}(this,[],Math,256,6,52,"object"==typeof module&&module,"function"==typeof define&&define,"random");
}
</script>
<style id="style-init-screen" type="text/css">#init-screen{display:none;z-index:100000;position:fixed;top:0;left:0;height:100%;width:100%;font-size:28px;text-align:center}#init-screen p{display:none;width:75%;margin:2em auto;font-weight:700;font-style:italic}#init-loading progress{height:20px}html.init-lacking #init-screen,html.init-loading #init-screen,html.init-no-js #init-screen{display:block}html.init-no-js #init-no-js{display:block}html.init-lacking #init-lacking{display:block}html.init-loading #init-loading{display:block}html.init-loading #passages,html.init-loading #ui-bar{display:none}html.init-no-js #init-no-js,noscript{color:red;font-weight:700}</style>
<style id="style-fonts" type="text/css">@font-face{font-family:icomoon-sugarcube;src:url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AABEkAAsAAAAAHHgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAABCAAADeQAABb40HwEm0ZGVE0AAA7sAAAAGgAAABxmn3O0R0RFRgAADwgAAAAdAAAAIABOAARPUy8yAAAPKAAAAEsAAABgL9zcQGNtYXAAAA90AAAAPQAAAVLgMPLNaGVhZAAAD7QAAAAuAAAANv41RT9oaGVhAAAP5AAAAB4AAAAkBBD/5GhtdHgAABAEAAAAHgAAAEgEkACpbWF4cAAAECQAAAAGAAAABgAhUABuYW1lAAAQLAAAAOsAAAIHCW+4AnBvc3QAABEYAAAADAAAACAAAwAAeJyNWAl0lEUS7j9OZoYkThLIIGcCCASYABkIQkQQMHIFEWEERBQEvBgE1ImrnAIRlB+E1QmycoiRS8IqizHgystjMRwyHgkEQcK94ALBAJrNPzBDar/qngxR43v7Jq+6u7q76qvq6ur6owmTSWiaVv/5idNemDZtaseXs5596qWJWROeFlqE0ERvf88I/313+BuZ9Jg79BhTYpRoPKI+6Xq4E2NZPNmf48+KbKblxTYTIq6ZdiW+mYhpZo+oL1qxDKuIFQ1Fc9FaOEQXkS76iAFiqHhUjBUTxWTxonhVzBULxVLhFatErvhYbBM7RKHYK74Rh8VxcVb8ot2RNfX5/qmpqWgeDDdO1XRRTVfVpKmmm2ruUU131fRQTbpq+qqmn2oeUE2Gah5UTX/ZOJU+p9LnVPqcSp9T6XMqfU6lz6n0OZU+p9LnVPqcSp9T6XMqfc4H/+D9Px6HENoi7U3tLW2xpmtLtKXa29oybbn2V+0d7V3Nq+VoK7T3tJXa37T3tVXaam2Ntlb7QFunfajlah9p67UN2kbRkk8jQsSIUi3N1NDU0bTBtNd0wnQxcnDkqMjtZpu5o3moOcucYzYsvSyBesOix9xpjm0VOyz2qzgtLil+RPwz8Xr9Ypvu95iCXr/XYvNnG/l2EtYfTCQs7YNEfvTIaB9MclhkG+LUsBMDGYEMc50zjtpsKYzFJhnYYKlzptxSS3GYnWhkGNBQ10y5uU6kkG8z1pvq3OL31L3nT6wLeuo2wkZawLWLREbeG/CWttVKVD1iJ3rd5qMXvY+E2LeZ6Fb5QhIRSXOIbj58GhNfQ9CN0UeIAi/YJMG+gnXZTPpFMuOd0NSN0aVYfrA3b1zLImaFhEmx1TFWVjWPlXpYfT3IoepXMK0B76S/20isGtFV9WjS1m8hm2gWk9lM5jApDJPZLKcAxJXO4Bey5rmsD8AofbTCQLfOYHjjsdGseQ9gTvmWhOmdX6QF/UgMGjdbWhArucpWYd7kYPCFJCK3tWTwlzFMmKnAC60yHSRvH1swGLOiH5MFYdI3TLKtbFAaEw8b9A16w6+xzTvZ5oGRDP7emoMAeMguVOChbwaDX8AYWrDmr4Br42WGeT1kAcAXMtkdqcCDbONFm7H8HhNvXM8i+rEw9mL6+wo8VM1hpYOkequEEgK1avgvtYBK3PJwFFrsWVJjeuUsFTYSKFz0DOuboM5cYpBxoJwaeGGYRDuHnb5Qor2mIkYCVWEjD+rmw2cUUBxjhgIq4xIn7ZfHHYoYiRZx8k4Y7VTZi7T5M/xp9rKegVL8XIarrMwwBUyR0LRvx1IS9raX7aSlz91NWtqysURrOEyfarWcqH3qR0Qp8C2t+tdAEhO2zFWztPbkdCC+J2VwQxIp2WNIOErakZjUG/rXPNqHxA/fjyVxmG1JyV5NVNq5CVUH+UDFnocAx2NqEeX35NlbRhmVfpPdlxnw4JdmpPl85Y7fzJcblfaA18DPUpttM7x+j71VVNBlujvKYbhwcdNuVQJGREyIyGGYR6XokY97vvCwDl54b+JvNCBFzKoY6YaWJWPgm/fyq4nOdelE4tcGfqquzD6F47JMseokZnVeG3CxjwMujOZceg1uOj1eIA56fUZU5cb5TTjxM9H+u+sTrQxctMJFC+KvQBXRy+tPEj2XGUGi+XcjiWKuWEmLnnEGkeP3QjYtKJ5gSMkGZNO8hotwVVqsEwiQPctI1PMih61pVUKix8lUEs+aGllthsfErtPhWq8uc0TAhTMQ/XSw4Gev4YF3A17dSAOR19ZwESQW6mAhQDRwGBuzsDAN+7wQwQt1xUzTI+EqtzokzIO6pCZdKjJ4vtzvsvsTgviZjco8u8FhWGrJzERPz3MHE3Tdn5DnhqdWrFuAoBs3G844VHiTRMe+uGXjIE2MF5pKr7gxs2C/zoaExrNhiQsofZl60BX0Qpo30vBm2gMJPiPBYkCtXSft6dnbiS7MhmuazB9KdHx+MTshkM+WunU9mMB2+DmSlk5YTuKlNdOJuEfoJcGYz976J9Gp13ALv3zyC6KDPyKZlty1FDF9ZMvuLwE++UQFibs7rSTRuM14El1ffQQuSn/sLtDJ9bB3izWfxKNV/YlyjCEQePDmWdBi5Ee6PO8g0ck+uOsn+5qRFQYUNSLa2SsVQaTzgQwOXCT6PKIYWjqNMEA4Qd5fDQ8121xFov8/knUcdilpK/J3wYCxC58hOp+1h8QDjHfLQ6VQ9P6iT4A1exCQrCroHyJymD0oyEMkx0kYipkF/ROB+elXh/P+MmDensIy25Bourg3ZOyKzMUL+/OFXLykjRsSXR3zJFHl9m1E11dXhMjZ/Z+EyNXHJxEdLbkCCEcecClKIm79asklkdhjuFqJ3iOhXruOh9VG0WFXhV5D23U8pDbKPb8ncqJdpwS5fKtVNSxlo2Sz5CkhbYxQ2CYUK+gi+qFhyhxh+emyFa/c0gfPI559nHNIO3QhkcQnZwRXUqduEl3LxWWL8ewi+hWnImwTj6GqKHoMfvn2U+TpzcfP4VqWdBqJOOOXt2gqVF9LvorYQ2hQyZJ6WJ7cATx+zwOHOgFEH34ioyPQe2UR5KwaNwsvP+08QqLbOU5MC/F4OVa+i5B55hIcWNHvTtCrT/yK/T3Avb71O8jceFlCOE1iVJvxHCirO+DA2l6CZ+LwVvact5ghAFYnD147I6GaROyLV2BFFh7RGNtxyFlwFDbeNxkB2OXh23KO4wJesEBYzx1DsOcQntMmJ7ZiYhHCwno9GbxZmDU53oCqq3gc6CQSaVz+DMiZ9KEsV6pBvz5TBCtW4GUrbYFr261oNfwaf2QPDiqu4E3sLwUiG6dKq3wZuwxrwd5cx97sPgTxfBHlwtVjOL4iAAIERFnJa3fB6I5NzkF81jycUDonDLzLQPd8Dyav8bAPTwywMkXglqx4k2cQ+PuQY0B2Mq9/iIR5WBJk3iIpNRFvqJEADSmdjuOWl7QlOsHnebjkOZDiCzyEC090bsq8tiFyQi7GrEjp3BRJRJj4aRVjmqF3L4jYhHrC1ELAiHZzZ5Nw7+bS8brnXoRH5Uyi8rXINFUfvkV0yf2GbmWpySz1x9tSGdFKRpTM5Dke/phEoqF3JtQlPDWA9+Pptun7WSafydHXF7CmbD6Z0XFSP3obzktMCqO1lp2KyGFt24//3s4wL5HRLtQZPbxY78lXlEUiNnqhtBNVl/f+QkSW2OxEBJ/BiYvHytDbex6bAtsmKApMG9tILnqjvkfvdKFEP79mv00/wFL3s50DWdNf2O4ZSIV42JDI6YNh63GRqhsjB15y4HrdbIOUdZlr8qqrqHOuLLoGgb2qb8Louy1IVS+fhafPVKLG9N+H6Po3eELy9h/apsNd51Bq0jHOxYc3wur/tEaW/u7JNJ1pN9DD7MRGZZg/twm5JhlPsNqrZNGSxL+wfNTMlq/qK52CeRJDpEIlGrwap5AKu6y9G6PubVhabZXm5OEl3JCIGI+owE1uPeo7XN0quKKlA98TDfguNlk9BUs/tTig9IR/OCvAKSRF43Ja9hTjwQCPJG/UqCidT+GlaSCjfwB5uQBk5AHudQUZ9TZREDWJqLe7D4Ck4CMhKqsIzoo6VwyadnYxcuzNcyCn8LnSLZJfDUWZS0daLg59lvgSC4Dmv81TWcoS9BbjYyi4AYFSdX8ha8PNps35CgF6lYwKiZE2pVgVToUbhzGQbcFXjb9XqrKPmAd7U9iWBtdxLBcmutgruMunSmcoT1HZ5i5W5Tqbz5Tp9/osQReus8NXbslDG/D4DI8lzxEqGfIQPYFSn1FqCVeBk/A6vsSh+kSLGiKHTCi3ZoKWhkluzcRtnlqSG9qW5DbO2zN9PktewGvPcxsJDneew+2GSg8Q8YSPqzNXJsoTsyNTd/v0cvzBynh8YSHp4zPLxp96FSMKEh1l9tZRX5rayMI4I9R3ByqlnEzDCzk+w8XmkLb8Iy5ytk7eTdXLxm6l6k0dXmffgcHVD1UacDdTOHlZE7wU6/ZCW/NKRFWbVxZR9ZAXtyBUr/b1Icp78gPYuxuuwgZUPK3aXkaO0rZvmmLmwWadJ1FQNBqzjjf0R11b1EiKOUDaZ2+PjGTh+Gyy8SPHCoVl+k8KgBVVIUDGf4wPT9tIU4jIYZhH19GjCu5VhId18MJ7E/NkVqhgp12v8SEPk3IcO/ScP3EtqlcPCtWg18wfKKgYURcbCfieAs91mwe/e+3uQH4wweJ2636XrK7z7Vy+oXKLkYSfMv6e5/KNdkcMRVR/jGfoi6ErObffrjhryk5FbpeiXJkitw/hYkpkXMSFaXnsXYi7ArzdcvpAxvdH4cUOrRtB062uMCD4/Wn0uEgLch4L+n8AuYFh2a7JTNzYcqAKqdDiIPpmB5+8oswVDfxHeFF7ZBrUbOht5d5RtVykdud72XVglaJqOXPVcpBjarkayokG/lK1xVqzk9mQl6LWsw6YsfO+dpKwExN0+5KYqGYipoEw83/I6ol4MVF8rr2pHfd7g/iZo/0u1P0uS3Rdpfuf+5XCi0WNc0PDGl5SNJfuQa7aTSEih0xoS80E5YTJlpqJ2zy1ZEtoG0vsvqwJZ8+eG/EWPYHPkeRBPfCqFByo3bPnojj1FY3BSRyY/pOkF9RycB9Xi35DvpbLeUnnWlt0xYW4ErUIKrqHez3UckDZoDOsplbZNFHrJUK5Xi6t1ZMTjJD36Nbo/zd063KxIrePQn5tRf8PlqV0RnicY2BgYGQAgpOd+YYg+lw3kyOMBgA8PwUsAAB4nGNgZGBg4ANiCQYQYGJgBEIFIGYB8xgABaoAUwAAAHicY2BmYmCcwMDKwMHow5jGwMDgDqW/MkgytDAwMDGwMjPAgQCCyRCQ5prC4PCA4QMD44P/Dxj0GB8wKDQwMDDCFSgAISMAEEIMHwB4nGNgYGBmgGAZBkYGEPAB8hjBfBYGAyDNAYRMIIkHch8Y/v8HsxggLAUmAUaoLjBgZGNA5o5IAADrtAjMAAAAeJxjYGRgYADild0rzsfz23xl4GZiAIFz3UyOCPr/AyYGxgdALgcDWBoAMdIKXgAAeJxjYGRgYHzw/wGDHhMDA8M/BiAJFEEBzABt5wP2AAB4nGNigAAmBqxAgcEAiQ0hOdHUJDA4MDAAABelAT4AAAAAUAAAIQAAeJydj81Kw0AUhb9pk0LRTV3oNhS3iTMRXNR9F66lq4K0IYQsmoFJ8yo+iG/km3gSZyEoCB243I9zz/0Z4Jp3DOMzrLiPPGPJS+Q5BR+RE1YmjZxyZR4iL6S/yWmSpZT11DXyjBueIs/Z8xo5keczcsqtuYu8YG2eaanwnBSejpyegYYDQfrAkRrayp+87/J+aA6hGo6S/nD9qG6nWecpB/lqMkr9zCpvFP/v/PaVOFWd+nKxFT1quO/OWx+aOisLm22yX9dJK13ubF5aJ/9lH9xJD/K2U1em1eP57OrQt77LXGEvnPwFPSJZ7QB4nGNgZsALAAB9AAQ=) format('woff');font-weight:400;font-style:normal}</style>
<style id="style-structural" type="text/css">body{margin:3.5em 3.5em 3.5em 21em}#store-area{display:none;z-index:0}#ui-bar{position:fixed;z-index:50;top:0;left:0;width:14.5em;height:100%;margin:0;padding:3.5em 1.5em 0 3.5em}html.ui-open body{overflow:hidden}#ui-overlay{display:none;z-index:1000;position:fixed;top:0;left:0;height:100%;width:100%}#ui-body-close{display:none;z-index:1110;position:fixed;white-space:nowrap}#ui-body{display:none;z-index:1100;position:fixed;overflow:auto;min-width:140px;max-width:90%;max-height:90%}#ui-body.options [id|=option-body]{display:table;width:100%}#ui-body.options [id|=option-label]{display:table-cell;width:80%;padding:.33em 2em .4em .33em}#ui-body.options [id|=option-control]{display:table-cell;padding:.33em .33em .4em;white-space:nowrap}#passages{z-index:10;margin-right:16%}#ui-body-close,#ui-body.dialog-list a,#ui-body.options a[id|=option-input],button{-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}</style>
<style id="style-appearance" type="text/css">body{color:#fff;background-color:#111;font-family:Verdana,"DejaVu Sans",Helmet,Freesans,sans-serif;font-size:12px}a{cursor:pointer;color:#46d}a:hover{color:#79f}a:active{color:#f70}a.link-external,a.link-internal{font-weight:700;text-decoration:none}a.link-external:hover,a.link-internal:hover{text-decoration:underline}a.link-broken{padding:3px;color:#000;background-color:red;font-weight:700;text-decoration:none}area{cursor:pointer}button{cursor:pointer;padding:4px 6px;color:#fff;background-color:#36c;border:1px solid #58e;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;text-decoration:none;text-shadow:1px 1px rgba(0,0,0,.4);-webkit-transition-duration:.2s;-moz-transition-duration:.2s;transition-duration:.2s}button:hover{background-color:#58e;border-color:#7af}button:active{background-color:#f70;border-color:#f92}button,input,textarea{outline:0}input,textarea{color:#fff;background-color:#111;border:1px solid #444;padding:.4em}input[type=text],textarea{min-width:20em}input{padding:2px 3px}input:focus,input:hover,textarea:focus,textarea:hover{background-color:#222;border:1px solid #eee}input[type=checkbox],input[type=radio]{cursor:pointer}textarea{overflow:auto}hr{height:1px;border:none;background-color:#fff}audio,canvas,progress,video{max-width:100%}.error{margin:0 12px 0 3px;padding:3px 5px;color:#000;background-color:red;font-weight:700}.error[title]{cursor:help}.highlight,.marked{color:#ff0;font-weight:700;font-style:italic}.nobr{white-space:nowrap}.transition-in{opacity:0}#ui-bar{overflow:auto;background-color:#222;border-right:1px solid #444}#menu,#ui-bar header{font-weight:700;text-align:right}#menu{margin-top:3em}#menu ul{margin:1em 0;padding:0;list-style:none}#menu li{margin-bottom:1em}#menu li a{text-decoration:none}#menu ul:last-child,#menu ul:last-child li:last-child{margin-bottom:0}#story-title{margin:0;font-size:210%}#story-subtitle{font-size:111%}#story-author{font-size:111%}#story-caption{margin-top:3em;text-align:right}#menu-options a:before,#menu-restart a:before,#menu-rewind a:before,#menu-saves a:before,#menu-share a:before,#ui-body-close,#ui-body.options a[id|=option-input].enabled:before,#ui-body.options a[id|=option-input]:before,[data-icon],a.link-back:before,a.link-external:after,a.link-return:after{font-family:icomoon-sugarcube;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}[data-icon]:before{content:attr(data-icon) "\00a0\00a0"}a.link-back:before{content:"\e00a\00a0\00a0"}a.link-return:after{content:"\00a0\00a0\e00b"}#passages a.link-external:after{content:"\00a0\e010"}#menu-saves a:before{content:"\e011\00a0\00a0"}#menu-rewind a:before{content:"\e012\00a0\00a0"}#menu-restart a:before{content:"\e013\00a0\00a0"}#menu-options a:before{content:"\e014\00a0\00a0"}#menu-share a:before{content:"\e015\00a0\00a0"}#credits,#version{margin-top:1em;color:#999;font-weight:400;font-size:71%}#ui-overlay{opacity:.8;background-color:#000}#ui-body-close{opacity:1;cursor:pointer;font-size:111%;margin:0;padding:3px 4px;font-weight:400;color:#fff;background-color:#36c;border:1px solid #58e;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;text-decoration:none;text-shadow:1px 1px rgba(0,0,0,.4);-webkit-transition-duration:.2s;-moz-transition-duration:.2s;transition-duration:.2s}#ui-body-close:hover{background-color:#58e;border-color:#7af}#ui-body-close:active{background-color:#f70;border-color:#f92}#ui-body{opacity:1;background-color:#222;border:1px solid #444;text-align:left;line-height:2}#ui-body div{padding:.2em}#ui-body hr{background-color:#444}#ui-body>ul>li+li>button{margin-left:12px}#ui-body.dialog{min-width:280px;padding:.33em 1em .66em}#ui-body.dialog ul.buttons{display:block;width:100%;margin:0;padding:0;list-style:none;text-align:left}#ui-body.dialog ul.buttons li{display:inline-block;margin:0;padding:.4em .4em .5em}#ui-body.dialog-list ul{margin:0;padding:0;list-style:none}#ui-body.dialog-list li{margin:0}#ui-body.dialog-list li:nth-child(even){background-color:rgba(255,255,255,.08)}#ui-body.dialog-list li a{display:block;padding:.25em .75em;color:#fff;font-weight:400;text-decoration:none}#ui-body.dialog-list li a:hover{background-color:#47b}#ui-body.dialog-list li a:active{background-color:#f70}#ui-body.saves table{border-spacing:0;min-width:320px;width:100%}#ui-body.saves tr:nth-child(even){background-color:rgba(255,255,255,.08)}#ui-body.saves td{padding:.33em .33em;line-height:1.2}#ui-body.saves td:first-child{min-width:1.5em;text-align:center}#ui-body.saves .empty{color:#999}#ui-body.saves ul{display:block;margin:0;padding:0;list-style:none;white-space:nowrap}#ui-body.saves li{display:inline-block;margin:0;padding:.33em .33em .4em}#ui-body.saves>div:not(:first-child){border-top:1px solid #444}#saves-import-label{margin:0 6px;font-weight:700}#saves-import-file{margin:0 6px 6px}#ui-body.options div[id|=option-body]+br+div[id|=option-body],#ui-body.options div[id|=option-body]+div[id|=option-body]{margin-top:.5em}#ui-body.options select[id|=option-input]{cursor:pointer;padding:3px 6px;font-weight:400;color:#fff;background-color:#36c;border:1px solid #58e;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;text-decoration:none;text-shadow:1px 1px rgba(0,0,0,.4);-webkit-transition-duration:.2s;-moz-transition-duration:.2s;transition-duration:.2s;white-space:nowrap}#ui-body.options a[id|=option-input]{cursor:pointer;padding:4px 6px;font-weight:400;color:#fff;background-color:#36c;border:1px solid #58e;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;text-decoration:none;text-shadow:1px 1px rgba(0,0,0,.4);-webkit-transition-duration:.2s;-moz-transition-duration:.2s;transition-duration:.2s;white-space:nowrap}#ui-body.options a[id|=option-input]:hover{background-color:#58e;border-color:#7af}#ui-body.options a[id|=option-input].enabled{background-color:#292;border-color:#4b4}#ui-body.options a[id|=option-input].enabled:hover{background-color:#4b4;border-color:#6d6}#ui-body.options a[id|=option-input]:before{content:"\e002\00a0\00a0"}#ui-body.options a[id|=option-input].enabled:before{content:"\e003\00a0\00a0"}.passage{line-height:1.75;text-align:left;transition:opacity .4s ease-in;-webkit-transition:opacity .4s ease-in}.passage ol,.passage ul{margin-left:.5em;padding-left:1.5em}.passage table{margin:1em 0;border-collapse:collapse;font-size:100%}.passage caption,.passage td,.passage th,.passage tr{padding:3px}</style>
<style id="style-media-queries" type="text/css">@media screen and (max-width:1440px){#passages{margin-right:8%}}@media screen and (max-width:1136px){body{margin:3.5% 3.5% 3.5% 20em}#ui-bar{padding-top:3.5%;padding-left:2.5em}#passages{margin:0}}</style>
<style id="style-media-queries-narrow" type="text/css">@media screen and (max-width:800px){body{margin:0}#ui-bar{position:relative;top:0;left:0;width:auto;height:auto;margin:0;padding:2.5% 3.5% 0;border:none;border-bottom:1px solid #fff}#story-caption,#ui-bar header{text-align:left;width:66%}#menu{position:absolute;top:0;right:0;margin:2.5% 3.5% 0 0}#menu ul{margin:0}#menu li{margin-bottom:.5em}#passages{width:auto;margin:1.5em 3.5% 3.5%}}</style>
</head>
<body>
	<div id="init-screen">
		<p id="init-no-js"><noscript>Apologies! JavaScript is required. Please enable it to continue.</noscript></p>
		<p id="init-lacking">Apologies! Your web browser lacks required capabilities. Please consider upgrading it or switching to a more modern web browser.</p>
		<p id="init-loading">Initializing. Please wait&hellip;<br /><progress></progress></p>
	</div>
	<div id="store-area" hidden><tw-storydata name="Finlit" startnode="1" creator="Twine" creator-version="2.9.0" format="SugarCube" format-version="1.0.35" ifid="EAA2190E-70C2-4B5E-B1FE-035B2D547BAF" options="" tags="" zoom="1" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="Start" tags="" position="625,275" size="100,100">:: Start
Welcome to the Financial Literacy Adventure!

You are about to embark on a journey to learn about managing finances, tracking expenses, handling chores, and budgeting.

[[Meet the Characters-&gt;Characters]]
[[Start Tracking Expenses-&gt;Expense Tracking]]
[[Manage Your Chores-&gt;Chore Management]]
[[Play the Budgeting Game-&gt;Budgeting Game]]
</tw-passagedata><tw-passagedata pid="2" name="Characters" tags="" position="375,475" size="100,100">:: Characters
Meet your guides on this journey:

- **Arjun**: A young professional navigating his first job.
- **Riya**: A high school student learning about savings.
- **Vikram**: A freelancer balancing irregular income.

[[Back to Start-&gt;Start]]
[[Start Tracking Expenses-&gt;Expense Tracking]]
[[Manage Your Chores-&gt;Chore Management]]
[[Play the Budgeting Game-&gt;Budgeting Game]]
</tw-passagedata><tw-passagedata pid="3" name="Expense Tracking" tags="" position="550,475" size="100,100">:: Expense Tracking
Tracking your expenses is crucial for financial health.

&lt;a href=&quot;http://localhost:3000/expense&quot; target=&quot;_blank&quot;&gt;Track your daily expenses&lt;/a&gt;

[[Back to Start-&gt;Start]]
[[Meet the Characters-&gt;Characters]]
[[Manage Your Chores-&gt;Chore Management]]
[[Play the Budgeting Game-&gt;Budgeting Game]]
</tw-passagedata><tw-passagedata pid="4" name="Chore Management" tags="" position="687.5,475" size="100,100">:: Chore Management
Managing your chores effectively helps you stay organized and productive.

&lt;a href=&quot;http://localhost:3000/choremanagement&quot; target=&quot;_blank&quot;&gt;Manage your chores&lt;/a&gt;

[[Back to Start-&gt;Start]]
[[Meet the Characters-&gt;Characters]]
[[Start Tracking Expenses-&gt;Expense Tracking]]
[[Play the Budgeting Game-&gt;Budgeting Game]]
</tw-passagedata><tw-passagedata pid="5" name="Budgeting Game" tags="" position="825,475" size="100,100">:: Budgeting Game
Welcome to the Budgeting Game! Here you&#39;ll learn how to allocate your monthly income wisely.

You have a monthly income of ₹30,000. Your goal is to allocate this amount across different categories without exceeding your budget.

[[Start the Game-&gt;Budgeting Start]]
[[Back to Start-&gt;Start]]
[[Meet the Characters-&gt;Characters]]
[[Start Tracking Expenses-&gt;Expense Tracking]]
[[Manage Your Chores-&gt;Chore Management]]
</tw-passagedata><tw-passagedata pid="6" name="Budgeting Start" tags="" position="812.5,600" size="100,100">:: Budgeting Start
Let&#39;s start with allocating your budget. You have ₹30,000 to distribute across the following categories:

- Rent
- Groceries
- Transportation
- Savings
- Entertainment

[[Allocate Budget-&gt;Allocate]]
</tw-passagedata><tw-passagedata pid="7" name="Allocate" tags="" position="812.5,725" size="100,100">:: Allocate
How much do you want to allocate for Rent?
&lt;&lt;textbox &quot;$rent&quot; &quot;&quot; &quot;Enter Amount for Rent&quot;&gt;&gt;

How much do you want to allocate for Groceries?
&lt;&lt;textbox &quot;$groceries&quot; &quot;&quot; &quot;Enter Amount for Groceries&quot;&gt;&gt;

How much do you want to allocate for Transportation?
&lt;&lt;textbox &quot;$transportation&quot; &quot;&quot; &quot;Enter Amount for Transportation&quot;&gt;&gt;

How much do you want to allocate for Savings?
&lt;&lt;textbox &quot;$savings&quot; &quot;&quot; &quot;Enter Amount for Savings&quot;&gt;&gt;

How much do you want to allocate for Entertainment?
&lt;&lt;textbox &quot;$entertainment&quot; &quot;&quot; &quot;Enter Amount for Entertainment&quot;&gt;&gt;

[[Submit-&gt;Submit Allocation]]
</tw-passagedata><tw-passagedata pid="8" name="Submit Allocation" tags="" position="812.5,850" size="100,100">:: Submit Allocation
&lt;&lt;set $total to $rent + $groceries + $transportation + $savings + $entertainment&gt;&gt;
&lt;&lt;if $total &gt; 30000&gt;&gt;
   You&#39;ve exceeded your budget! Please try again.
   [[Allocate Budget-&gt;Allocate]]
&lt;&lt;else&gt;&gt;
   Great job! You&#39;ve successfully allocated your budget.
   [[Back to Start-&gt;Start]]
&lt;&lt;/if&gt;&gt;
</tw-passagedata></tw-storydata></div>
	<script id="script-sugarcube" type="text/javascript">
	/*! SugarCube JS

	SugarCube includes code from TiddlyWiki 1.2.39, which has the following license:
	--------------------------------------------------------------------------------

	TiddlyWiki 1.2.39 by Jeremy Ruston, (jeremy [at] osmosoft [dot] com)

	Published under a BSD open source license

	Copyright (c) Osmosoft Limited 2005

	Redistribution and use in source and binary forms, with or without modification,
	are permitted provided that the following conditions are met:

	Redistributions of source code must retain the above copyright notice, this list
	of conditions and the following disclaimer.

	Redistributions in binary form must reproduce the above copyright notice, this
	list of conditions and the following disclaimer in the documentation and/or
	other materials provided with the distribution.

	Neither the name of the Osmosoft Limited nor the names of its contributors may
	be used to endorse or promote products derived from this software without
	specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
	ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	if(document.documentElement.classList.contains("init-loading")){!function(window,document,undefined){"use strict";function clone(e){if("object"!=typeof e||null==e)return e;if("function"==typeof e.clone)return e.clone(!0);if(e.nodeType&&"function"==typeof e.cloneNode)return e.cloneNode(!0);var t,r=Object.prototype.toString.call(e);if("[object Date]"===r)t=new Date(e.getTime());else if("[object RegExp]"===r)t=new RegExp(e);else if(Array.isArray(e))t=[];else{var i=Object.getPrototypeOf(e);t=i?Object.create(i):e.constructor.prototype}return Object.keys(e).forEach(function(r){t[r]=clone(e[r])}),t}function insertElement(e,t,r,i,a,n){var s=document.createElement(t);return r&&(s.id=r),i&&(s.className=i),n&&(s.title=n),a&&insertText(s,a),e&&e.appendChild(s),s}function insertText(e,t){return e.appendChild(document.createTextNode(t))}function removeChildren(e){if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild)}function removeElement(e){"function"==typeof e.remove?e.remove():e.parentNode&&e.parentNode.removeChild(e)}function setPageElement(e,t,r){var i="object"==typeof e?e:document.getElementById(e);if(null==i)return null;removeChildren(i),Array.isArray(t)||(t=[t]);for(var a=0,n=t.length;n>a;a++)if(tale.has(t[a]))return new Wikifier(i,tale.get(t[a]).processText().trim()),i;return null!=r&&(r=r.trim(),""!==r&&new Wikifier(i,r)),i}function addStyle(e){var t=document.getElementById("style-story");null===t&&(t=document.createElement("style"),t.id="style-story",t.type="text/css",document.head.appendChild(t));var r=/\[[<>]?[Ii][Mm][Gg]\[(?:\s|\S)*?\]\]+/g;r.test(e)&&(e=e.replace(r,function(e){var t=Wikifier.helpers.parseSquareBracketedMarkup({source:e,matchStart:0});if(t.hasOwnProperty("error")||t.pos<e.length)return e;var r=t.source;if("data:"!==r.slice(0,5)&&tale.has(r)){var i=tale.get(r);i.tags.contains("Twine.image")&&(r=i.text)}return'url("'+r.replace(/"/g,"%22")+'")'})),t.styleSheet?t.styleSheet.cssText+=e:t.appendChild(document.createTextNode(e))}function throwError(e,t,r){return insertElement(e,"span",null,"error","Error: "+t,r),!1}function printableStringOrDefault(e,t){switch(typeof e){case"number":if(isNaN(e))return t;break;case"object":return null===e?t:Array.isArray(e)?e.join(", "):"[object]";case"function":case"undefined":return t}return String(e)}function fade(e,t){function r(){a+=.05*o,i(s,Math.easeInOut(a)),(1===o&&a>=1||-1===o&&0>=a)&&(e.style.visibility="in"===t.fade?"visible":"hidden",s.parentNode.replaceChild(e,s),s=null,window.clearInterval(n),t.onComplete&&t.onComplete())}function i(e,t){var r=Math.floor(100*t);e.style.zoom=1,e.style.filter="alpha(opacity="+r+")",e.style.opacity=t}var a,n,s=e.cloneNode(!0),o="in"===t.fade?1:-1;e.parentNode.replaceChild(s,e),"in"===t.fade?(a=0,s.style.visibility="visible"):a=1,i(s,a),n=window.setInterval(r,25)}function scrollWindowTo(e,t){function r(){l+=t,window.scroll(0,n+u*(o*Math.easeInOut(l))),l>=1&&window.clearInterval(c)}function i(e){for(var t=0;e.offsetParent;)t+=e.offsetTop,e=e.offsetParent;return t}function a(e){var t=i(e),r=t+e.offsetHeight,a=window.scrollY?window.scrollY:document.body.scrollTop,n=window.innerHeight?window.innerHeight:document.body.clientHeight,s=a+n;return a>t?t:r>s&&e.offsetHeight<n?t-(n-e.offsetHeight)+20:t}null==t?t=.1:("number"!=typeof t&&(t=Number(t)),isNaN(t)||0>t?t=.1:t>1&&(t=1));var n=window.scrollY?window.scrollY:document.body.scrollTop,s=a(e),o=Math.abs(n-s),l=0,u=n>s?-1:1,c=window.setInterval(r,25)}function SeedablePRNG(e,t){Object.defineProperties(this,new Math.seedrandom(e,t,function(e,t){return{_prng:{value:e},seed:{writable:!0,value:t},count:{writable:!0,value:0},random:{value:function(){return this.count++,this._prng()}}}}))}function AudioWrapper(e){Object.defineProperties(this,{audio:{value:e},_faderId:{writable:!0,value:null}}),"metadata"!==this.audio.preload&&"auto"!==this.audio.preload&&(this.audio.preload="metadata")}function History(e){this.active={init:!0,variables:{}},config.historyMode===History.Modes.Hash&&(this.hash=""),this.history=[],window.SugarCube[e||"state"]=this}function Passage(e,t,r){if(this.title=e,this.domId="passage-"+Util.slugify(this.title),t){if(this.element=t,this.id=r,this.tags=t.hasAttribute("tags")?t.getAttribute("tags").trim().splitOrEmpty(/\s+/):[],this.classes=[],this.tags.length>0){for(var i=/^(?:debug|nobr|passage|script|stylesheet|widget|twine\..*)$/i,a=[],n=0;n<this.tags.length;n++)i.test(this.tags[n])||a.push(Util.slugify(this.tags[n]));a.length>0&&(t.className&&(a=a.concat(t.className.split(/\s+/))),this.classes=a.sort().filter(function(e,t,r){return 0===t||r[t-1]!==e}))}}else this.element=null,this.id=undefined,this.tags=[],this.classes=[]}function Tale(e){this._title="",this._domId="",this.passages={},this.styles=[],this.scripts=[],this.widgets=[];var t,r,i,a,n,s=document.getElementById("store-area").childNodes;config.startPassage=null;var o=s[0].hasAttribute("startnode")?s[0].getAttribute("startnode"):"";s=s[0].childNodes;for(var t=0;t<s.length;t++){var r=s[t];if(r.nodeType===Node.ELEMENT_NODE)switch(r.nodeName.toUpperCase()){case"STYLE":this.styles.push(new Passage("user-style-node-"+t,r,-t));break;case"SCRIPT":this.scripts.push(new Passage("user-script-node-"+t,r,-t));break;default:var i=r.hasAttribute("name")?r.getAttribute("name"):"";if(""===i)continue;var a=r.hasAttribute("tags")?r.getAttribute("tags").trim().splitOrEmpty(/\s+/):[];if(a.containsAny("Twine.private","annotation"))continue;var l=r.hasAttribute("pid")?r.getAttribute("pid"):"",n=new Passage(i,r,+l);""!==o&&o===l&&(config.startPassage=i),a.contains("widget")?this.widgets.push(n):this.passages[i]=n}}this.title=Util.unescape("Finlit"),window.SugarCube[e||"tale"]=this}function Macros(){Object.defineProperties(this,{definitions:{value:{}},tags:{value:{}}})}function MacrosContext(e,t,r,i,a,n,s,o){Object.defineProperties(this,{context:{value:e},parent:{value:e},self:{value:t},name:{value:r},args:{value:a},payload:{value:n},parser:{value:s},output:{value:s.output},source:{value:o}}),Object.defineProperties(this.args,{raw:{value:i},full:{value:Wikifier.parse(i)}})}function defineStandardMacros(){function e(e,t,r){r=jQuery.extend({},r),e.addClass("event-"+Util.slugify(t)+(r.once?"-once":"")),e[r.once?"one":"on"](t+".macros",function(){if(""!==r.content){var e;try{"undefined"!=typeof r.widgetArgs&&(state.active.variables.hasOwnProperty("args")&&(e=state.active.variables.args),state.active.variables.args=r.widgetArgs),Wikifier.wikifyEval(r.content)}finally{"undefined"!=typeof r.widgetArgs&&(delete state.active.variables.args,"undefined"!=typeof e&&(state.active.variables.args=e))}}"function"==typeof r.callback&&r.callback()})}macros.add("actions",{version:{major:3,minor:0,patch:0},handler:function(){var e=insertElement(this.output,"ul");e.classList.add(this.name),state.active.variables["#actions"]||(state.active.variables["#actions"]={});for(var t=0;t<this.args.length;t++){var r,i,a,n,s;"object"==typeof this.args[t]&&this.args[t].isImage?(a=document.createElement("img"),a.src=this.args[t].source,this.args[t].hasOwnProperty("passage")&&a.setAttribute("data-passage",this.args[t].passage),this.args[t].hasOwnProperty("title")&&(a.title=this.args[t].title),this.args[t].hasOwnProperty("align")&&(a.align=this.args[t].align),r=this.args[t].link,n=this.args[t].setFn):"object"==typeof this.args[t]?(i=this.args[t].text,r=this.args[t].link,n=this.args[t].setFn):i=r=this.args[t],state.active.variables["#actions"].hasOwnProperty(r)&&state.active.variables["#actions"][r]||(s=Wikifier.createInternalLink(insertElement(e,"li"),r,null,function(e,t){return function(){state.active.variables["#actions"][e]=!0,"function"==typeof t&&t()}}(r,n)),null==a?insertText(s,i):s.appendChild(a),s.classList.add("link-"+this.name),s.classList.add("macro-"+this.name))}}}),macros.add(["back","return"],{version:{major:5,minor:0,patch:0},handler:function(){var e,t,r,i,a=1,n=this.name[0].toUpperCase()+this.name.slice(1);if(1===this.args.length&&"object"==typeof this.args[0]&&(this.args[0].isImage?(r=document.createElement("img"),r.src=this.args[0].source,this.args[0].hasOwnProperty("passage")&&r.setAttribute("data-passage",this.args[0].passage),this.args[0].hasOwnProperty("title")&&(r.title=this.args[0].title),this.args[0].hasOwnProperty("align")&&(r.align=this.args[0].align),this.args[0].hasOwnProperty("link")&&(this.args.push("to"),this.args.push(this.args[0].link)),this.args[0]=null):1===this.args[0].count?(this.args.push(this.args[0].link),this.args[0]="to"):(this.args.push("to"),this.args.push(this.args[0].link),this.args[0]=this.args[0].text)),1===this.args.length)t=this.args[0];else if(0!==this.args.length)if(3===this.args.length&&(t=this.args.shift()),"go"===this.args[0]){if(isNaN(this.args[1])||this.args[1]<1)return this.error('argument following "go" must be a whole number greater than zero');a=this.args[1]<state.length?this.args[1]:state.length-1,e=state.peek(a).title,n+=" (go "+a+")"}else{if("to"!==this.args[0])return this.error('"'+this.args[0]+'" is not a valid action (go|to)');if("object"==typeof this.args[1]&&(this.args[1]=this.args[1].link),!tale.has(this.args[1]))return this.error('passage "'+this.args[1]+'" does not exist');if("return"===this.name)e=this.args[1],n+=' (to "'+e+'")';else for(var s=state.length-1;s>=0;s--)if(state.history[s].title===this.args[1]){a=state.length-1-s,e=this.args[1],n+=' (to "'+e+'")';break}if(null==e)return this.error('cannot find passage "'+this.args[1]+'" in the current story history')}return null==e&&state.length>1&&(e=state.peek(a).title),null==e?this.error("cannot find passage"):0===a?this.error("already at the first passage in the current story history"):(i=document.createElement("a"),i.classList.add("link-internal"),i.classList.add("link-"+this.name),i.classList.add("macro-"+this.name),a>0&&jQuery(i).click(function(){return"back"===this.name?config.historyMode===History.Modes.Hash||config.disableHistoryControls?function(){for(;a>0&&state.length>1;)state.pop(),a--;state.setActiveState(state.top),state.display(e,i,"replace")}:function(){state.length>1&&window.history.go(-a)}:function(){state.display(e,i)}}.call(this)),null==r?insertText(i,t||this.self.dtext||n):i.appendChild(r),void this.output.appendChild(i))},linktext:function(){0===this.args.length?delete this.self.dtext:this.self.dtext=this.args[0]}},!0),macros.add("choice",{version:{major:5,minor:0,patch:0},handler:function(){if(0===this.args.length)return this.error("no passage specified");var e,t,r,i,a,n=state.active.title;if(1===this.args.length?"object"==typeof this.args[0]&&this.args[0].isImage?(r=document.createElement("img"),r.src=this.args[0].source,this.args[0].hasOwnProperty("passage")&&r.setAttribute("data-passage",this.args[0].passage),this.args[0].hasOwnProperty("title")&&(r.title=this.args[0].title),this.args[0].hasOwnProperty("align")&&(r.align=this.args[0].align),e=this.args[0].link,i=this.args[0].setFn):"object"==typeof this.args[0]?(t=this.args[0].text,e=this.args[0].link,i=this.args[0].setFn):t=e=this.args[0]:(e=this.args[0],t=this.args[1]),state.active.variables.hasOwnProperty("#choice")){if(state.active.variables["#choice"].hasOwnProperty(n)&&state.active.variables["#choice"][n])return a=insertElement(this.output,"span"),null==r?insertText(a,t):a.appendChild(r),a.classList.add("link-disabled"),a.classList.add("link-"+this.name),void a.classList.add("macro-"+this.name)}else state.active.variables["#choice"]={};a=Wikifier.createInternalLink(this.output,e,null,function(){state.active.variables["#choice"][n]=!0,"function"==typeof i&&i()}),null==r?insertText(a,t):a.appendChild(r),a.classList.add("link-"+this.name),a.classList.add("macro-"+this.name)}}),macros.add("link",{version:{major:4,minor:0,patch:0},actionRegExp:/^disable|remove|keep|once$/,handler:function(){if(0===this.args.length)return this.error("no link location specified");var e,t,r,i,a,n,s,o=this.self.actionRegExp;if(3===this.args.length?n=this.args.pop():2===this.args.length&&o.test(this.args[1])&&(n=this.args.pop()),null!=n&&!o.test(n))return this.error('"'+n+'" is not a valid action (disable|remove)');if(2===this.args.length?(t=this.args[0],e=this.args[1]):"object"==typeof this.args[0]&&this.args[0].isImage?(r=document.createElement("img"),r.src=this.args[0].source,this.args[0].hasOwnProperty("passage")&&r.setAttribute("data-passage",this.args[0].passage),this.args[0].hasOwnProperty("title")&&(r.title=this.args[0].title),this.args[0].hasOwnProperty("align")&&(r.align=this.args[0].align),e=this.args[0].link,i=this.args[0].external,a=this.args[0].setFn):"object"==typeof this.args[0]?(t=this.args[0].text,e=this.args[0].link,i=this.args[0].external,a=this.args[0].setFn):t=e=this.args[0],null==i&&(i=Wikifier.isExternalLink(e)),n)if(state.active.variables.hasOwnProperty("#link")){if(state.active.variables["#link"].hasOwnProperty(e)&&state.active.variables["#link"][e])return void("disable"!==n&&"keep"!==n||(s=insertElement(this.output,"span"),null==r?insertText(s,t):s.appendChild(r),s.classList.add("link-disabled"),s.classList.add("link-"+this.name),s.classList.add("macro-"+this.name)))}else state.active.variables["#link"]={};s=i?Wikifier.createExternalLink(this.output,e):Wikifier.createInternalLink(this.output,e,null,function(){n&&(state.active.variables["#link"][e]=!0),"function"==typeof a&&a()}),null==r?insertText(s,t):s.appendChild(r),s.classList.add("link-"+this.name),s.classList.add("macro-"+this.name)}}),macros.add("display",{version:{major:3,minor:1,patch:0},handler:function(){if(0===this.args.length)return this.error("no passage specified");var e;if(e="object"==typeof this.args[0]?this.args[0].link:this.args[0],!tale.has(e))return this.error('passage "'+e+'" does not exist');var t=this.output;e=tale.get(e),this.args[1]&&(t=insertElement(t,this.args[1],null,e.domId),t.setAttribute("data-passage",e.title)),new Wikifier(t,e.processText())}}),macros.add("nobr",{version:{major:2,minor:0,patch:0},skipArgs:!0,tags:null,handler:function(){new Wikifier(this.output,this.payload[0].contents.replace(/^\n+|\n+$/g,"").replace(/\n+/g," "))}}),macros.add("print",{version:{major:3,minor:0,patch:0},skipArgs:!0,handler:function(){if(0===this.args.full.length)return this.error("no expression specified");try{var e=printableStringOrDefault(Util.evalExpression(this.args.full),null);null!==e&&new Wikifier(this.output,e)}catch(e){return this.error("bad expression: "+e.message)}}}),macros.add("silently",{version:{major:4,minor:0,patch:0},skipArgs:!0,tags:null,handler:function(){var e=document.createDocumentFragment(),t=[];for(new Wikifier(e,this.payload[0].contents.trim());e.hasChildNodes();){var r=e.firstChild;r.classList&&r.classList.contains("error")&&t.push(r.textContent),e.removeChild(r)}return t.length>0?this.error("error"+(1===t.length?"":"s")+" within contents ("+t.join("; ")+")"):void 0}}),macros.add("if",{version:{major:4,minor:0,patch:0},skipArgs:!0,tags:["elseif","else"],handler:function(){try{for(var e=0,t=this.payload.length;t>e;e++){switch(this.payload[e].name){case"else":if(0!==this.payload[e].arguments.length)return/^\s*if\b/i.test(this.payload[e].arguments)?this.error('whitespace is not allowed between the "else" and "if" in <<elseif>> clause'+(e>0?" (#"+e+")":"")):this.error("<<else>> does not accept a conditional expression (perhaps you meant to use <<elseif>>), invalid: "+this.payload[e].arguments);break;default:if(0===this.payload[e].arguments.length)return this.error("no conditional expression specified for <<"+this.payload[e].name+">> clause"+(e>0?" (#"+e+")":""));if(!config.macros.disableIfAssignmentError&&/[^!=&^|<>*\/%+-]=[^=]/.test(this.payload[e].arguments))return this.error('assignment operator "=" found within <<'+this.payload[e].name+">> clause"+(e>0?" (#"+e+")":"")+" (perhaps you meant to use an equality operator: ==, ===, eq, is), invalid: "+this.payload[e].arguments)}if("else"===this.payload[e].name||Wikifier.evalExpression(this.payload[e].arguments)){new Wikifier(this.output,this.payload[e].contents);break}}}catch(t){return this.error("bad conditional expression in <<"+(0===e?"if":"elseif")+">> clause"+(e>0?" (#"+e+")":"")+": "+t.message)}}}),macros.add("for",{version:{major:1,minor:0,patch:1},skipArgs:!0,tags:null,handler:function(){var e,t,r,i=this.args.full.trim(),a=this.payload[0].contents.replace(/\n$/,""),n=!0,s=config.macros.maxLoopIterations;if(0===i.length)i=!0;else if(-1!==i.indexOf(";")){if(null===(r=i.match(/^([^;]*?)\s*;\s*([^;]*?)\s*;\s*([^;]*?)$/)))return this.error("invalid 3-part syntax, format: init ; condition ; post");e=r[1],i=r[2],t=r[3]}try{if(runtime.temp.break=null,e)try{Util.evalExpression(e)}catch(e){return this.error("bad init expression: "+e.message)}for(;Util.evalExpression(i);){if(--s<0)return this.error("exceeded configured maximum loop iterations ("+config.macros.maxLoopIterations+")");if(new Wikifier(this.output,n?a.replace(/^\n/,""):a),n&&(n=!1),null!=runtime.temp.break)if(1===runtime.temp.break)runtime.temp.break=null;else if(2===runtime.temp.break){runtime.temp.break=null;break}if(t)try{Util.evalExpression(t)}catch(e){return this.error("bad post expression: "+e.message)}}}catch(e){return this.error("bad conditional expression: "+e.message)}finally{runtime.temp.break=null}}}),macros.add(["break","continue"],{version:{major:1,minor:0,patch:0},skipArgs:!0,handler:function(){return this.contextHas(function(e){return"for"===e.name})?void(runtime.temp.break="continue"===this.name?1:2):this.error("must only be used in conjunction with its parent macro <<for>>")}}),macros.add("set",{version:{major:3,minor:1,patch:0},skipArgs:!0,handler:function(){return 0===this.args.full.length?this.error("no expression specified"):void macros.evalStatements(this.args.full,this)}}),macros.add("unset",{version:{major:2,minor:1,patch:0},skipArgs:!0,handler:function(){if(0===this.args.full.length)return this.error("no $variable list specified");for(var e,t=this.args.full,r=/state\.active\.variables\.(\w+)/g;null!==(e=r.exec(t));){var i=e[1];state.active.variables.hasOwnProperty(i)&&delete state.active.variables[i]}}}),macros.add("remember",{version:{major:3,minor:1,patch:0},skipArgs:!0,handler:function(){if(0===this.args.full.length)return this.error("no expression specified");var e=this.args.full;if(macros.evalStatements(e,this)){for(var t,r=storage.getItem("remember")||{},i=/state\.active\.variables\.(\w+)/g;null!==(t=i.exec(e));){var a=t[1];r[a]=state.active.variables[a]}if(!storage.setItem("remember",r))return this.error("unknown error, cannot remember: "+this.args.raw)}},init:function(){var e=storage.getItem("remember");e&&Object.keys(e).forEach(function(t){state.active.variables[t]=e[t]})}}),macros.add("forget",{version:{major:1,minor:1,patch:0},skipArgs:!0,handler:function(){if(0===this.args.full.length)return this.error("no $variable list specified");for(var e,t=this.args.full,r=/state\.active\.variables\.(\w+)/g,i=storage.getItem("remember"),a=!1;null!==(e=r.exec(t));){var n=e[1];state.active.variables.hasOwnProperty(n)&&delete state.active.variables[n],i&&i.hasOwnProperty(n)&&(a=!0,delete i[n])}return a&&!storage.setItem("remember",i)?this.error("unknown error, cannot update remember store"):void 0}}),macros.add("run","set"),macros.add("script",{version:{major:1,minor:0,patch:0},skipArgs:!0,tags:null,handler:function(){macros.evalStatements(this.payload[0].contents,this)}}),macros.add(["button","click"],{version:{major:5,minor:0,patch:0},tags:null,handler:function(){if(0===this.args.length)return this.error("no "+("click"===this.name?"link":"button")+" text specified");var t,r=function(){var e;return state.active.variables.hasOwnProperty("args")&&this.contextHas(function(e){return e.self.isWidget})&&(e=state.active.variables.args),e}.call(this),i=document.createElement("click"===this.name?"a":"button");if("object"==typeof this.args[0]&&this.args[0].isImage){var a=insertElement(i,"img");a.src=this.args[0].source,this.args[0].hasOwnProperty("passage")&&a.setAttribute("data-passage",this.args[0].passage),this.args[0].hasOwnProperty("title")&&(a.title=this.args[0].title),this.args[0].hasOwnProperty("align")&&(a.align=this.args[0].align),t=this.args[0].link}else{var n;"object"==typeof this.args[0]?(n=this.args[0].text,t=this.args[0].link):(n=this.args[0],t=this.args.length>1?this.args[1]:undefined),insertText(i,n)}i.classList.add("link-"+(null!=t?tale.has(t)?"internal":"broken":"internal")),i.classList.add("link-"+this.name),i.classList.add("macro-"+this.name),e(jQuery(i),"click",{content:this.payload[0].contents.trim(),widgetArgs:r,callback:null!=t?function(){state.display(t,i)}:undefined}),this.output.appendChild(i)}}),macros.add("checkbox",{version:{major:5,minor:1,patch:0},handler:function(){if(this.args.length<3){var e=[];return this.args.length<1&&e.push("$variable name"),this.args.length<2&&e.push("unchecked value"),this.args.length<3&&e.push("checked value"),this.error("no "+e.join(" or ")+" specified")}var t=this.args[0].trim(),r=Util.slugify(t),i=this.args[1],a=this.args[2],n=document.createElement("input");return"$"!==t[0]?this.error('$variable name "'+t+'" is missing its sigil ($)'):(n.type="checkbox",n.id="checkbox-"+r,n.name="checkbox-"+r,n.classList.add("macro-"+this.name),this.args.length>3&&"checked"===this.args[3]?(n.checked=!0,Wikifier.setValue(t,a)):Wikifier.setValue(t,i),jQuery(n).change(function(){Wikifier.setValue(t,this.checked?a:i)}),void this.output.appendChild(n))}}),macros.add("radiobutton",{version:{major:5,minor:1,patch:0},handler:function(){if(this.args.length<2){var e=[];return this.args.length<1&&e.push("$variable name"),this.args.length<2&&e.push("checked value"),this.error("no "+e.join(" or ")+" specified")}var t=this.args[0].trim(),r=Util.slugify(t),i=this.args[1],a=document.createElement("input");return"$"!==t[0]?this.error('$variable name "'+t+'" is missing its sigil ($)'):(runtime.temp.hasOwnProperty("radiobutton")||(runtime.temp.radiobutton={}),runtime.temp.radiobutton.hasOwnProperty(r)||(runtime.temp.radiobutton[r]=0),a.type="radio",a.id="radiobutton-"+r+"-"+runtime.temp.radiobutton[r]++,a.name="radiobutton-"+r,a.classList.add("macro-"+this.name),this.args.length>2&&"checked"===this.args[2]&&(a.checked=!0,Wikifier.setValue(t,i)),jQuery(a).change(function(){this.checked&&Wikifier.setValue(t,i)}),void this.output.appendChild(a))}}),macros.add("textarea",{version:{major:1,minor:0,patch:0},handler:function(){if(this.args.length<2){var e=[];return this.args.length<1&&e.push("$variable name"),this.args.length<2&&e.push("default value"),this.error("no "+e.join(" or ")+" specified")}var t=this.args[0].trim(),r=Util.slugify(t),i=this.args[1],a="autofocus"===this.args[2],n=document.createElement("textarea");return"$"!==t[0]?this.error('$variable name "'+t+'" is missing its sigil ($)'):(n.id="textarea-"+r,n.name="textarea-"+r,n.rows=4,n.cols=68,n.textContent=i,a&&n.setAttribute("autofocus","autofocus"),n.classList.add("macro-"+this.name),Wikifier.setValue(t,i),jQuery(n).change(function(){Wikifier.setValue(t,this.value)}),this.output.appendChild(n),void(a&&(postdisplay["#autofocus:"+n.id]=function(e){setTimeout(function(){n.focus()},1),delete postdisplay[e]})))}}),macros.add("textbox",{version:{major:5,minor:1,patch:0},handler:function(){if(this.args.length<2){var e=[];return this.args.length<1&&e.push("$variable name"),this.args.length<2&&e.push("default value"),this.error("no "+e.join(" or ")+" specified")}var t,r=this.args[0].trim(),i=Util.slugify(r),a=this.args[1],n=!1,s=document.createElement("input");return"$"!==r[0]?this.error('$variable name "'+r+'" is missing its sigil ($)'):(this.args.length>3?(t=this.args[2],n="autofocus"===this.args[3]):this.args.length>2&&("autofocus"===this.args[2]?n=!0:t=this.args[2]),s.type="text",s.id="textbox-"+i,s.name="textbox-"+i,s.value=a,n&&s.setAttribute("autofocus","autofocus"),s.classList.add("macro-"+this.name),Wikifier.setValue(r,a),jQuery(s).change(function(){Wikifier.setValue(r,this.value)}).keypress(function(e){13===e.which&&(e.preventDefault(),Wikifier.setValue(r,this.value),"undefined"!=typeof t&&state.display(t,this))}),this.output.appendChild(s),void(n&&(postdisplay["#autofocus:"+s.id]=function(e){setTimeout(function(){s.focus()},1),delete postdisplay[e]})))}}),macros.add(["addclass","toggleclass"],{version:{major:2,minor:0,patch:1},handler:function(){if(this.args.length<2){var e=[];return this.args.length<1&&e.push("selector"),this.args.length<2&&e.push("class names"),this.error("no "+e.join(" or ")+" specified")}var t=jQuery(this.args[0]);if(0===t.length)return this.error('no elements matched the selector "'+this.args[0]+'"');switch(this.name){case"addclass":t.addClass(this.args[1].trim());break;case"toggleclass":t.toggleClass(this.args[1].trim())}}}),macros.add("removeclass",{version:{major:1,minor:0,patch:1},handler:function(){if(0===this.args.length)return this.error("no selector specified");var e=jQuery(this.args[0]);return 0===e.length?this.error('no elements matched the selector "'+this.args[0]+'"'):void(this.args.length>1?e.removeClass(this.args[1].trim()):e.removeClass())}}),macros.add(["append","prepend","replace"],{version:{major:2,minor:1,patch:0},tags:null,handler:function(){if(0===this.args.length)return this.error("no selector specified");var e=jQuery(this.args[0]);if(0===e.length)return this.error('no elements matched the selector "'+this.args[0]+'"');if("replace"===this.name&&e.empty(),""!==this.payload[0].contents){var t=document.createDocumentFragment();switch(new Wikifier(t,this.payload[0].contents),this.name){case"replace":case"append":e.append(t);break;case"prepend":e.prepend(t)}}}}),macros.add("remove",{version:{major:1,minor:0,patch:1},handler:function(){if(0===this.args.length)return this.error("no selector specified");var e=jQuery(this.args[0]);return 0===e.length?this.error('no elements matched the selector "'+this.args[0]+'"'):void e.remove()}}),macros.add("goto",{version:{major:1,minor:0,patch:0},handler:function(){if(0===this.args.length)return this.error("no passage specified");var e;return e="object"==typeof this.args[0]?this.args[0].link:this.args[0],tale.has(e)?void setTimeout(function(){state.display(e)},40):this.error('passage "'+e+'" does not exist')}}),macros.add("widget",{version:{major:2,minor:1,patch:0},tags:null,handler:function(){if(0===this.args.length)return this.error("no widget name specified");var e=this.args[0];if(macros.has(e)){if(!macros.get(e).isWidget)return this.error('cannot clobber existing macro "'+e+'"');macros.remove(e)}try{macros.add(e,{version:{major:1,minor:0,patch:0},isWidget:!0,handler:function(e){return function(){var t;try{state.active.variables.hasOwnProperty("args")&&(t=state.active.variables.args),state.active.variables.args=[];for(var r=0,i=this.args.length;i>r;r++)state.active.variables.args[r]=this.args[r];state.active.variables.args.raw=this.args.raw,state.active.variables.args.full=this.args.full;var a=document.createDocumentFragment(),n=document.createDocumentFragment(),s=[];for(new Wikifier(n,e);n.hasChildNodes();){var o=n.firstChild;o.classList&&o.classList.contains("error")&&s.push(o.textContent),a.appendChild(o)}if(0!==s.length)return this.error("error"+(1===s.length?"":"s")+" within widget contents ("+s.join("; ")+")");this.output.appendChild(a)}catch(e){return this.error("cannot execute widget: "+e.message)}finally{delete state.active.variables.args,"undefined"!=typeof t&&(state.active.variables.args=t)}}}(this.payload[0].contents)})}catch(t){return this.error('cannot create widget macro "'+e+'": '+t.message)}}}),has.audio?(macros.add("audio",{version:{major:1,minor:2,revision:0},handler:function(){if(this.args.length<2){var e=[];return this.args.length<1&&e.push("track ID"),this.args.length<2&&e.push("actions"),this.error("no "+e.join(" or ")+" specified")}var t=macros.get("cacheaudio").tracks,r=this.args[0];if(!t.hasOwnProperty(r))return this.error("no track by ID: "+r);for(var i,a,n,s,o,l,u,c,h=t[r],d=5,p=this.args.slice(1);p.length>0;){var f=p.shift();switch(f){case"play":case"pause":case"stop":i=f;break;case"fadein":i="fade",l=1;break;case"fadeout":i="fade",l=0;break;case"fadeto":if(0===p.length)return this.error("fadeto missing required level value");if(i="fade",c=p.shift(),l=parseFloat(c),isNaN(l)||!isFinite(l))return this.error("cannot parse fadeto: "+c);break;case"fadeoverto":if(p.length<2){var e=[];return p.length<1&&e.push("seconds"),p.length<2&&e.push("level"),this.error("fadeoverto missing required "+e.join(" and ")+" value"+(e.length>1?"s":""))}if(i="fade",c=p.shift(),d=parseFloat(c),isNaN(d)||!isFinite(d))return this.error("cannot parse fadeoverto: "+c);if(c=p.shift(),l=parseFloat(c),isNaN(l)||!isFinite(l))return this.error("cannot parse fadeoverto: "+c);break;case"volume":if(0===p.length)return this.error("volume missing required level value");if(c=p.shift(),a=parseFloat(c),isNaN(a)||!isFinite(a))return this.error("cannot parse volume: "+c);break;case"mute":case"unmute":n="mute"===f;break;case"time":if(0===p.length)return this.error("time missing required seconds value");if(c=p.shift(),s=parseFloat(c),isNaN(s)||!isFinite(s))return this.error("cannot parse time: "+c);break;case"loop":case"unloop":o="loop"===f;break;case"goto":if(0===p.length)return this.error("goto missing required passage title");if(c=p.shift(),u="object"==typeof c?c.link:c,!tale.has(u))return this.error('passage "'+u+'" does not exist');break;default:return this.error("unknown action: "+f)}}try{switch(null!=a&&(h.volume=a),null!=s&&(h.time=s),null!=n&&(n?h.mute():h.unmute()),null!=o&&(o?h.loop():h.unloop()),null!=u&&h.oneEnd(function(e){state.display(u)}),i){case"play":h.play();break;case"pause":h.pause();break;case"stop":h.stop();break;case"fade":h.volume===l&&(0===l?h.volume=1:1===l&&(h.volume=0)),h.fadeWithDuration(d,h.volume,l)}}catch(e){return this.error("error playing audio: "+e.message)}}}),macros.add("stopallaudio",{version:{major:1,minor:0,revision:0},handler:function(){var e=macros.get("cacheaudio").tracks;Object.keys(e).forEach(function(t){e[t].stop()})}}),macros.add("cacheaudio",{version:{major:1,minor:0,revision:1},handler:function(){if(this.args.length<2){var e=[];return this.args.length<1&&e.push("track ID"),this.args.length<2&&e.push("sources"),this.error("no "+e.join(" or ")+" specified")}for(var t=this.self.types,r=this.self.canPlay,i=document.createElement("audio"),a=this.args[0],n=/\.([^\.\/\\]+)$/,s=1;s<this.args.length;s++){var o=this.args[s],l=n.exec(Util.parseUrl(o).pathname);if(null!==l){var u=l[1].toLowerCase(),c=t.hasOwnProperty(u)?t[u]:"audio/"+u;if(r.hasOwnProperty(c)||(r[c]=""!==i.canPlayType(c).replace(/^no$/i,"")),r[c]){var h=document.createElement("source");h.src=o,h.type=c,i.appendChild(h)}}}i.hasChildNodes()&&(i.preload="auto",this.self.tracks[a]=new AudioWrapper(i))},types:Object.freeze({mp3:"audio/mpeg; codecs=mp3",ogg:"audio/ogg; codecs=vorbis",webm:"audio/webm; codecs=vorbis",wav:"audio/wav; codecs=1"}),canPlay:{},tracks:{}}),macros.add("playlist",{version:{major:1,minor:3,revision:0},handler:function(){if(0===this.args.length)return this.error("no actions specified");for(var e,t,r,i,a,n,s,o=this.self,l=5,u=this.args.slice(0);u.length>0;){var c=u.shift();switch(c){case"play":case"pause":case"stop":e=c;break;case"fadein":e="fade",n=1;break;case"fadeout":e="fade",n=0;break;case"fadeto":if(0===u.length)return this.error("fadeto missing required level value");if(e="fade",s=u.shift(),n=parseFloat(s),isNaN(n)||!isFinite(n))return this.error("cannot parse fadeto: "+s);break;case"fadeoverto":if(u.length<2){var h=[];return u.length<1&&h.push("seconds"),u.length<2&&h.push("level"),this.error("fadeoverto missing required "+h.join(" and ")+" value"+(h.length>1?"s":""))}if(e="fade",s=u.shift(),l=parseFloat(s),isNaN(l)||!isFinite(l))return this.error("cannot parse fadeoverto: "+s);if(s=u.shift(),n=parseFloat(s),isNaN(n)||!isFinite(n))return this.error("cannot parse fadeoverto: "+s);break;case"volume":if(0===u.length)return this.error("volume missing required level value");if(s=u.shift(),t=parseFloat(s),isNaN(t)||!isFinite(t))return this.error("cannot parse volume: "+s);break;case"mute":case"unmute":r="mute"===c;
break;case"loop":case"unloop":i="loop"===c;break;case"shuffle":case"unshuffle":a="shuffle"===c;break;default:return this.error("unknown action: "+c)}}try{switch(null!=t&&o.setVolume(t),null!=r&&(o.muted=r,r?o.mute():o.unmute()),null!=i&&(o.loop=i),null!=a&&(o.shuffle=a,o.buildList()),e){case"play":o.play();break;case"pause":o.pause();break;case"stop":o.stop();break;case"fade":o.volume===n&&(0===n?o.setVolume(1):1===n&&o.setVolume(0)),o.fade(l,n)}}catch(e){return this.error("error playing audio: "+e.message)}},play:function(){0===this.list.length&&this.buildList(),(null===this.current||this.current.isEnded())&&this.next(),this.current.play()},pause:function(){null!==this.current&&this.current.pause()},stop:function(){null!==this.current&&this.current.stop()},fade:function(e,t){0===this.list.length&&this.buildList(),null===this.current||this.current.isEnded()?this.next():this.current.volume=this.volume,this.current.fadeWithDuration(e,this.current.volume,t),this.volume=t},mute:function(){null!==this.current&&this.current.mute()},unmute:function(){null!==this.current&&this.current.unmute()},next:function(){this.current=this.list.shift(),this.current.volume=this.volume},setVolume:function(e){this.volume=e,null!==this.current&&(this.current.volume=e)},onEnd:function(e){var thisp=macros.get("playlist");if(0===thisp.list.length){if(!thisp.loop)return;thisp.buildList()}thisp.next(),thisp.muted&&thisp.mute(),thisp.current.play()},buildList:function(){this.list=this.tracks.slice(0),this.shuffle&&(this.list.shuffle(),this.list.length>1&&this.list[0]===this.current&&this.list.push(this.list.shift()))},tracks:[],list:[],current:null,volume:1,muted:!1,loop:!0,shuffle:!1}),macros.add("setplaylist",{version:{major:2,minor:0,revision:1},handler:function(){if(0===this.args.length)return this.error("no track ID(s) specified");for(var e=macros.get("cacheaudio").tracks,t=macros.get("playlist"),r=[],i=0;i<this.args.length;i++){var a=this.args[i];if(!e.hasOwnProperty(a))return this.error("no track by ID: "+a);var n=e[a].clone();n.stop(),n.unloop(),n.unmute(),n.volume=1,jQuery(n.audio).off("ended").on("ended.macros:playlist",t.onEnd),r.push(n)}null!==t.current&&t.current.pause(),t.tracks=r,t.list=[],t.current=null,t.volume=1,t.muted=!1,t.loop=!0,t.shuffle=!1}})):macros.add(["audio","stopallaudio","cacheaudio","playlist","setplaylist"],{version:{major:1,minor:0,revision:0},handler:function(){}}),macros.add(["optiontoggle","optionlist"],{version:{major:2,minor:1,patch:0},tags:["onchange"],handler:function(){if(0===this.args.length)return this.error("no option property specified");if("optionlist"===this.name&&this.args.length<2)return this.error("no list specified");var e=this.args[0],t=Util.slugify(e),r=document.createElement("div"),i=document.createElement("div"),a=document.createElement("div");r.appendChild(i),r.appendChild(a),r.id="option-body-"+t,i.id="option-label-"+t,a.id="option-control-"+t,a.classList.add("macro-"+this.name),new Wikifier(i,this.payload[0].contents.trim());var n=2===this.payload.length?this.payload[1].contents.trim():"";switch(options.hasOwnProperty(e)||(options[e]=undefined),this.name){case"optiontoggle":var s=this.args.length>1?this.args[1]:undefined,o=document.createElement("a");options[e]===undefined&&(options[e]=!1),options[e]?(insertText(o,s||"On"),o.classList.add("enabled")):insertText(o,s||"Off"),jQuery(o).click(function(){return function(t){removeChildren(o),options[e]?(insertText(o,s||"Off"),o.classList.remove("enabled"),options[e]=!1):(insertText(o,s||"On"),o.classList.add("enabled"),options[e]=!0),macros.get("saveoptions").handler(),""!==n&&new Wikifier(document.createElement("div"),n)}}());break;case"optionlist":var l=this.args[1],o=document.createElement("select");Array.isArray(l)||(l=options.hasOwnProperty(l)?options[l]:l.trim().split(/\s*,\s*/)),options[e]===undefined&&(options[e]=l[0]);for(var u=0;u<l.length;u++){var c=document.createElement("option");insertText(c,l[u]),o.appendChild(c)}o.value=options[e],jQuery(o).change(function(){return function(t){options[e]=t.target.value,macros.get("saveoptions").handler(),""!==n&&new Wikifier(document.createElement("div"),n)}}())}o.id="option-input-"+t,a.appendChild(o),this.output.appendChild(r)}}),macros.add("optionbar",{version:{major:3,minor:1,patch:0},handler:function(){var e=document.createElement("ul"),t=document.createElement("li"),r=document.createElement("li");e.appendChild(t),e.appendChild(r),e.classList.add("buttons"),e.classList.add("macro-"+this.name),t.appendChild(insertElement(null,"button","options-ok","ui-close","OK")),r.appendChild(insertElement(null,"button","options-reset","ui-close","Reset to Defaults")),jQuery("button",r).click(function(e){macros.get("deleteoptions").handler(),window.location.reload()}),this.output.appendChild(e)}}),macros.add("saveoptions",{version:{major:2,minor:0,patch:0},handler:function(){return storage.setItem("options",options)},init:function(){var e=storage.getItem("options");null!==e&&Object.keys(e).forEach(function(t){options[t]=e[t]})}}),macros.add("deleteoptions",{version:{major:2,minor:0,patch:0},handler:function(){return options={},storage.removeItem("options")?void 0:this.error("unknown error, cannot update options store")}})}function either(){return 0!==arguments.length?Array.prototype.concat.apply([],arguments).random():void 0}function lastVisited(){if(state.isEmpty()||0===arguments.length)return-1;var e,t=Array.prototype.concat.apply([],arguments);if(t.length>1){e=state.length;for(var r=0,i=t.length;i>r;r++)e=Math.min(e,lastVisited(t[r]))}else{var a=state.history,n=t[0];for(e=state.length-1;e>=0&&a[e].title!==n;e--);-1!==e&&(e=state.length-1-e)}return e}function passage(){return state.active.title}function previous(e){if(0!==arguments.length){if(1>e)throw new RangeError("previous offset parameter must be a positive integer greater than zero");return state.length>e?state.peek(e).title:""}if(state.length<2)return"";for(var t=state.length-2;t>=0;t--)if(state.history[t].title!==state.active.title)return state.history[t].title;return""}function random(e,t){if(0===arguments.length)throw new Error("random called with insufficient arguments");if(1===arguments.length&&(t=e,e=0),e>t){var r=t;t=e,e=r}return Math.floor(Math.random()*(t-e+1))+e}function randomFloat(e,t){if(0===arguments.length)throw new Error("randomFloat called with insufficient arguments");if(1===arguments.length&&(t=e,e=0),e>t){var r=t;t=e,e=r}return Math.random()*(t-e)+e}function tags(){if(0===arguments.length)return tale.get(state.active.title).tags.slice(0);for(var e=Array.prototype.concat.apply([],arguments),t=[],r=0,i=e.length;i>r;r++)t=t.concat(tale.get(e[r]).tags);return t}function turns(){return state.length}function visited(){if(state.isEmpty())return 0;var e,t=Array.prototype.concat.apply([],0===arguments.length?[state.active.title]:arguments);if(t.length>1){e=state.length;for(var r=0,i=t.length;i>r;r++)e=Math.min(e,visited(t[r]))}else{var a=state.history,n=t[0];e=0;for(var r=0,i=state.length;i>r;r++)a[r].title===n&&e++}return e}function visitedTags(){if(0===arguments.length)return 0;for(var e=Array.prototype.concat.apply([],arguments),t=e.length,r=0,i=0,a=state.length;a>i;i++){var n=tale.get(state.history[i].title).tags;if(0!==n.length){for(var s=0,o=0;t>o;o++)n.contains(e[o])&&s++;s===t&&r++}}return r}function visitedTag(){return visitedTags.apply(null,arguments)}function alertUser(e,t,r,i){var a="Apologies! A "+e+" problem has occurred.";switch(e){case"fatal":a+=" Aborting.";break;case"technical":a+=" You may be able to continue, but some parts may not work properly."}null==t&&null==r||(a+="\n\nError",null!=t&&(a+=" ["+t+"]"),a+=": "+(null!=r?r.replace(/^Error:\s+/,""):"unknown error")+"."),i&&i.stack&&(a+="\n\nStack Trace:\n"+i.stack),window.alert(a)}function fatalAlert(e,t,r){alertUser("fatal",e,t,r)}function technicalAlert(e,t,r){alertUser("technical",e,t,r)}Array.isArray||Object.defineProperty(Array,"isArray",{configurable:!0,writable:!0,value:function(e){return"[object Array]"===Object.prototype.toString.call(e)}}),Array.prototype.indexOf||Object.defineProperty(Array.prototype,"indexOf",{configurable:!0,writable:!0,value:function(e,t){if(null==this)throw new TypeError("Array.prototype.indexOf called on null or undefined");var r=Object(this),i=r.length>>>0;for(t=+t||0,isFinite(t)||(t=0),0>t&&(t+=i,0>t&&(t=0));i>t;t++)if(r[t]===e)return t;return-1}}),Array.prototype.filter||Object.defineProperty(Array.prototype,"filter",{configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("Array.prototype.filter called on null or undefined");if("function"!=typeof e)throw new TypeError("Array.prototype.filter callback parameter must be a function");for(var t=Object(this),r=t.length>>>0,i=[],thisp=arguments[1],a=0;r>a;a++)if(a in t){var n=t[a];e.call(thisp,n,a,t)&&i.push(n)}return i}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError("Array.prototype.find callback parameter must be a function");for(var t=Object(this),r=t.length>>>0,thisp=arguments[1],i=0;r>i;i++)if(i in t){var a=t[i];if(e.call(thisp,a,i,t))return a}return undefined}}),Array.prototype.forEach||Object.defineProperty(Array.prototype,"forEach",{configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("Array.prototype.forEach called on null or undefined");if("function"!=typeof e)throw new TypeError("Array.prototype.forEach callback parameter must be a function");for(var t=Object(this),r=t.length>>>0,thisp=arguments[1],i=0;r>i;i++)if(i in t){var a=t[i];e.call(thisp,a,i,t)}return undefined}}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");return-1!==Array.prototype.indexOf.apply(this,arguments)}}),Array.prototype.map||Object.defineProperty(Array.prototype,"map",{configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("Array.prototype.map called on null or undefined");if("function"!=typeof e)throw new TypeError("Array.prototype.map callback parameter must be a function");for(var t=Object(this),r=t.length>>>0,i=new Array(r),thisp=arguments[1],a=0;r>a;a++)if(a in t){var n=t[a];i[a]=e.call(thisp,n,a,t)}return i}}),Array.prototype.some||Object.defineProperty(Array.prototype,"some",{configurable:!0,writable:!0,value:function(e){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof e)throw new TypeError("Array.prototype.some callback parameter must be a function");for(var t=Object(this),r=t.length>>>0,thisp=arguments[1],i=0;r>i;i++)if(i in t){var a=t[i];if(e.call(thisp,a,i,t))return!0}return!1}}),Date.now||Object.defineProperty(Date,"now",{configurable:!0,writable:!0,value:function(){return(new Date).getTime()}}),Math.trunc||Object.defineProperty(Math,"trunc",{configurable:!0,writable:!0,value:function(e){return 0>e?Math.ceil(e):Math.floor(e)}}),String.prototype.includes||Object.defineProperty(String.prototype,"includes",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.includes called on null or undefined");return-1!==String.prototype.indexOf.apply(this,arguments)}}),String.prototype.splice||Object.defineProperty(String.prototype,"splice",{configurable:!0,writable:!0,value:function(e,t,r){if(null==this)throw new TypeError("String.prototype.splice called on null or undefined");var i=this.length>>>0;if(0===i)return"";e=+e||0,isFinite(e)?0>e&&(e+=i,0>e&&(e=0)):e=0,e>i&&(e=i),t=+t||0,(!isFinite(t)||0>t)&&(t=0);var a=this.slice(0,e);return"undefined"!=typeof r&&(a+=r),i>e+t&&(a+=this.slice(e+t)),a}}),String.prototype.trim||Object.defineProperty(String.prototype,"trim",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.trim called on null or undefined");return this.replace(/^\s+|\s+$/g,"")}}),String.prototype.trimLeft||Object.defineProperty(String.prototype,"trimLeft",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.trimLeft called on null or undefined");return this.replace(/^\s+/,"")}}),String.prototype.trimRight||Object.defineProperty(String.prototype,"trimRight",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.trimRight called on null or undefined");return this.replace(/\s+$/,"")}}),Object.create&&"function"==typeof Object.create||Object.defineProperty(Object,"create",{configurable:!0,writable:!0,value:function(){function e(){}return function(t){if(1!==arguments.length)throw new Error("polyfill Object.create implementation only accepts one parameter");if(null==t)throw new TypeError("Object.create proto parameter is null or undefined");if("object"!=typeof t)throw new TypeError("Object.create proto parameter must be an object");return e.prototype=t,new e}}()}),Object.defineProperty(Array,"random",{configurable:!0,writable:!0,value:function(e,t,r){return 2===arguments.length&&(r=t,t=0),Array.isArray(e)?e.random(t,r):e.hasOwnProperty("length")?Array.prototype.slice.call(e,0).random(t,r):undefined}}),Object.defineProperty(Array.prototype,"contains",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Array.prototype.contains called on null or undefined");return-1!==Array.prototype.indexOf.apply(this,arguments)}}),Object.defineProperty(Array.prototype,"containsAll",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Array.prototype.containsAll called on null or undefined");if(1===arguments.length)return Array.isArray(arguments[0])?Array.prototype.containsAll.apply(this,arguments[0]):-1!==Array.prototype.indexOf.apply(this,arguments);for(var e=0,t=arguments.length;t>e;e++)if(!Array.prototype.some.call(this,function(e){return e===this.val},{val:arguments[e]}))return!1;return!0}}),Object.defineProperty(Array.prototype,"containsAny",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Array.prototype.containsAny called on null or undefined");if(1===arguments.length)return Array.isArray(arguments[0])?Array.prototype.containsAny.apply(this,arguments[0]):-1!==Array.prototype.indexOf.apply(this,arguments);for(var e=0,t=arguments.length;t>e;e++)if(Array.prototype.some.call(this,function(e){return e===this.val},{val:arguments[e]}))return!0;return!1}}),Object.defineProperty(Array.prototype,"count",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Array.prototype.count called on null or undefined");for(var e=Array.prototype.indexOf,t=arguments[0],r=Number(arguments[1]||0),i=0;-1!==(r=e.call(this,t,r));)i++,r++;return i}}),Object.defineProperty(Array.prototype,"pluck",{configurable:!0,writable:!0,value:function(e,t){if(null==this)throw new TypeError("Array.prototype.pluck called on null or undefined");if(0!==this.length)return 1===arguments.length&&(t=e,e=0),null==e?e=0:0>e?e=0:e>=this.length&&(e=this.length-1),null==t?t=this.length-1:0>t?t=0:t>=this.length&&(t=this.length-1),Array.prototype.splice.call(this,random(e,t),1)[0]}}),Object.defineProperty(Array.prototype,"random",{configurable:!0,writable:!0,value:function(e,t){if(null==this)throw new TypeError("Array.prototype.random called on null or undefined");if(0!==this.length)return 1===arguments.length&&(t=e,e=0),null==e?e=0:0>e?e=0:e>=this.length&&(e=this.length-1),null==t?t=this.length-1:0>t?t=0:t>=this.length&&(t=this.length-1),this[random(e,t)]}}),Object.defineProperty(Array.prototype,"shuffle",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Array.prototype.shuffle called on null or undefined");if(0!==this.length){for(var e=this.length-1;e>0;e--){var t=Math.floor(Math.random()*(e+1)),r=this[e];this[e]=this[t],this[t]=r}return this}}}),Object.defineProperty(Function.prototype,"partial",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("Function.prototype.partial called on null or undefined");var e=Array.prototype.slice,t=this,r=e.call(arguments,0);return function(){for(var i=[],a=0,n=0;n<r.length;n++)i.push(r[n]===undefined?arguments[a++]:r[n]);return t.apply(this,i.concat(e.call(arguments,a)))}}}),Object.defineProperty(Math,"clamp",{configurable:!0,writable:!0,value:function(e,t,r){return e=Number(e),isNaN(e)?NaN:e.clamp(t,r)}}),Object.defineProperty(Math,"easeInOut",{configurable:!0,writable:!0,value:function(e){return e=Number(e),1-(Math.cos(e*Math.PI)+1)/2}}),Object.defineProperty(Number.prototype,"clamp",{configurable:!0,writable:!0,value:function(e,t){var r=Number(this);return e>r&&(r=e),r>t&&(r=t),r}}),Object.defineProperty(RegExp,"escape",{configurable:!0,writable:!0,value:function(e){return String(e).replace(/[-.*+?^${}()|\[\]\/\\]/g,"\\$&")}}),Object.defineProperty(String,"format",{configurable:!0,writable:!0,value:function(e){function t(e,t,r){if(!t)return e;var i=Math.abs(t)-e.length;if(1>i)return e;var a=Array(i+1).join(r);return 0>t?e+a:a+e}if(arguments.length<2)return 0===arguments.length?"":e;var r=2===arguments.length&&Array.isArray(arguments[1])?arguments[1].slice(0):Array.prototype.slice.call(arguments,1);return 0===r.length?e:e.replace(/{(\d+)(?:,([+-]?\d+))?}/g,function(e,i,a){var n=r[i];if(null==n)return"";for(;"function"==typeof n;)n=n();switch(typeof n){case"string":break;case"object":n=JSON.stringify(n);break;default:n=String(n)}return t(n,a?parseInt(a):0," ")})}}),Object.defineProperty(String.prototype,"contains",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.contains called on null or undefined");return-1!==String.prototype.indexOf.apply(this,arguments)}}),Object.defineProperty(String.prototype,"count",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.count called on null or undefined");var e=String(arguments[0]||"");if(""===e)return 0;for(var t=String.prototype.indexOf,r=e.length,i=Number(arguments[1]||0),a=0;-1!==(i=t.call(this,e,i));)a++,i+=r;return a}}),Object.defineProperty(String.prototype,"splitOrEmpty",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.splitOrEmpty called on null or undefined");return""===String(this)?[]:String.prototype.split.apply(this,arguments)}}),Object.defineProperty(String.prototype,"ltrim",{configurable:!0,writable:!0,value:String.prototype.trimLeft}),Object.defineProperty(String.prototype,"rtrim",{configurable:!0,writable:!0,value:String.prototype.trimRight}),Object.defineProperty(String.prototype,"readBracketedList",{configurable:!0,writable:!0,value:function(){if(null==this)throw new TypeError("String.prototype.readBracketedList called on null or undefined");for(var e,t=new RegExp("(?:\\[\\[((?:\\s|\\S)*?)\\]\\])|([^\"'\\s]\\S*)","gm"),r=[];null!==(e=t.exec(this));)e[1]?r.push(e[1]):e[2]&&r.push(e[2]);return r}}),Object.defineProperty(Function.prototype,"toJSON",{configurable:!0,writable:!0,value:function(){return JSON.reviveWrapper(this.toString())}}),Object.defineProperty(RegExp.prototype,"toJSON",{configurable:!0,writable:!0,value:function(){return JSON.reviveWrapper(this.toString())}}),Object.defineProperty(Date.prototype,"toJSON",{configurable:!0,writable:!0,value:function(){return JSON.reviveWrapper('new Date("'+this.toISOString()+'")')}}),Object.defineProperty(JSON,"reviveWrapper",{configurable:!0,writable:!0,value:function(e){if("string"!=typeof e)throw new TypeError("JSON.reviveWrapper code parameter must be a string");return"@@revive@@("+e+")"}}),Object.defineProperty(JSON,"_real_parse",{configurable:!0,writable:!0,value:JSON.parse}),Object.defineProperty(JSON,"parse",{configurable:!0,writable:!0,value:function(text,reviver){return JSON._real_parse(text,function(key,value){if("string"==typeof value&&"@@revive@@"===value.slice(0,10))try{value=eval(value.slice(10))}catch(e){}if("function"==typeof reviver)try{value=reviver(key,value)}catch(e){}return value})}});var has={defineProperty:"function"==typeof Object.defineProperty,getOwnPropertyDescriptor:"function"==typeof Object.getOwnPropertyDescriptor,pushState:"history"in window&&"pushState"in window.history&&"state"in window.history&&function(){try{return window.history.replaceState(window.history.state,window.document.title),!0}catch(e){return!1}}(),localStorage:"localStorage"in window&&function(e){try{if(null!=e&&e.length>=0){var t="SugarCube.localStorage.test",r="1701 Guilty Scott";if(e.setItem(t,r),e.getItem(t)===r)return e.removeItem(t),!0}return!1}catch(e){return!1}}(window.localStorage),sessionStorage:"sessionStorage"in window&&function(e){try{if(null!=e&&e.length>=0){var t="SugarCube.sessionStorage.test",r="1701 Guilty Scott";if(e.setItem(t,r),e.getItem(t)===r)return e.removeItem(t),!0}return!1}catch(e){return!1}}(window.sessionStorage),indexedDB:"indexedDB"in window,fileAPI:"File"in window&&"FileList"in window&&"FileReader"in window,audio:"function"==typeof document.createElement("audio").canPlayType},browser={userAgent:navigator.userAgent.toLowerCase()};browser.isGecko=navigator&&"Gecko"===navigator.product&&!/webkit|trident/.test(browser.userAgent),browser.isIE=/msie|trident/.test(browser.userAgent)&&!browser.userAgent.contains("opera"),browser.ieVersion=function(){var e=/(?:msie\s+|rv:)(\d{1,2}\.\d)/.exec(browser.userAgent);return e?+e[1]:0}(),browser.isOpera=browser.userAgent.contains("opera")||browser.userAgent.contains(" opr/"),browser.operaVersion=function(){var e=new RegExp((/applewebkit|chrome/.test(browser.userAgent)?"opr":"version")+"\\/(\\d{1,2}\\.\\d+)"),t=e.exec(browser.userAgent);return t?+t[1]:0}(),browser.isMobile={any:function(){return browser.isMobile.Android||browser.isMobile.BlackBerry||browser.isMobile.iOS||browser.isMobile.Windows},Android:/android/.test(browser.userAgent),BlackBerry:/blackberry/.test(browser.userAgent),iOS:/ip(?:hone|ad|od)/.test(browser.userAgent),Windows:/iemobile/.test(browser.userAgent)},has.fileAPI=has.fileAPI&&!browser.isMobile.any()&&(!browser.isOpera||browser.operaVersion>=15);var strings={identity:"game",saves:{autoloadPrompt:"There's an existing autosave.  Load it now or go to the start?",autoloadPromptOK:"Load autosave",autoloadPromptCancel:"Go to start",disallowed:"Saving has been disallowed on this passage."}},saveAs=saveAs||navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator)||function(e){var t=e.document,r=function(){return e.URL||e.webkitURL||e},i=e.URL||e.webkitURL||e,a=t.createElementNS("http://www.w3.org/1999/xhtml","a"),n="download"in a,s=function(r){var i=t.createEvent("MouseEvents");i.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),r.dispatchEvent(i)},o=e.webkitRequestFileSystem,l=e.requestFileSystem||o||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},c="application/octet-stream",h=0,d=[],p=function(){for(var e=d.length;e--;){var t=d[e];"string"==typeof t?i.revokeObjectURL(t):t.remove()}d.length=0},f=function(e,t,r){t=[].concat(t);for(var i=t.length;i--;){var a=e["on"+t[i]];if("function"==typeof a)try{a.call(e,r||e)}catch(e){u(e)}}},g=function(t,i){var u,p,g,m=this,y=t.type,v=!1,w=function(){var e=r().createObjectURL(t);return d.push(e),e},b=function(){f(m,"writestart progress write writeend".split(" "))},k=function(){!v&&u||(u=w(t)),p?p.location.href=u:window.open(u,"_blank"),m.readyState=m.DONE,b()},x=function(e){return function(){return m.readyState!==m.DONE?e.apply(this,arguments):void 0}},E={create:!0,exclusive:!1};return m.readyState=m.INIT,i||(i="download"),n?(u=w(t),a.href=u,a.download=i,s(a),m.readyState=m.DONE,void b()):(e.chrome&&y&&y!==c&&(g=t.slice||t.webkitSlice,t=g.call(t,0,t.size,c),v=!0),o&&"download"!==i&&(i+=".download"),(y===c||o)&&(p=e),l?(h+=t.size,void l(e.TEMPORARY,h,x(function(e){e.root.getDirectory("saved",E,x(function(e){var r=function(){e.getFile(i,E,x(function(e){e.createWriter(x(function(r){r.onwriteend=function(t){p.location.href=e.toURL(),d.push(e),m.readyState=m.DONE,f(m,"writeend",t)},r.onerror=function(){var e=r.error;e.code!==e.ABORT_ERR&&k()},"writestart progress write abort".split(" ").forEach(function(e){r["on"+e]=m["on"+e]}),r.write(t),m.abort=function(){r.abort(),m.readyState=m.DONE},m.readyState=m.WRITING}),k)}),k)};e.getFile(i,{create:!1},x(function(e){e.remove(),r()}),x(function(e){e.code===e.NOT_FOUND_ERR?r():k()}))}),k)}),k)):void k())},m=g.prototype,y=function(e,t){return new g(e,t)};return m.abort=function(){var e=this;e.readyState=e.DONE,f(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,e.addEventListener("unload",p,!1),y}(self),Util=Object.defineProperties({},{isNumeric:{value:function(e){switch(typeof e){case"number":break;case"string":e=Number(e);break;default:return!1}return isFinite(e)&&!isNaN(e)}},isBoolean:{value:function(e){return"boolean"==typeof e||"string"==typeof e&&("true"===e||"false"===e)}},slugify:{value:function(e){return e.trim().replace(/[^\w\s\u2013\u2014-]+/g,"").replace(/[_\s\u2013\u2014-]+/g,"-").toLocaleLowerCase()}},escape:{value:function(e){if(null==e)return"";var t=/[&<>"'`]/g,r=RegExp(t.source),i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};return e=String(e),e&&r.test(e)?e.replace(t,function(e){return i[e]}):e}},unescape:{value:function(e){if(null==e)return"";var t=/&(?:amp|lt|gt|quot|apos|#39|#x27|#96|#x60);/g,r=RegExp(t.source),i={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&#39;":"'","&#x27;":"'","&#96;":"`","&#x60;":"`"};return e=String(e),e&&r.test(e)?e.replace(t,function(e){return i[e]}):e}},evalExpression:{value:function(expression){return eval("("+expression+")")}},evalStatements:{value:function(statements){return eval("(function(){"+statements+"\n}());"),!0}},DiffOp:{value:Object.freeze({Delete:0,SpliceArray:1,Copy:2,CopyDate:3})},diff:{value:function(e,t){for(var r,i=[].concat(Object.keys(e),Object.keys(t)).sort().filter(function(e,t,r){return 0===t||r[t-1]!==e}),a={},n=Array.isArray(e),s=0,o=i.length;o>s;s++){var l=i[s],u=e[l],c=t[l];if(e.hasOwnProperty(l))if(t.hasOwnProperty(l)){if(u===c)continue;if(typeof u==typeof c)if("function"==typeof u)u.toString()!==c.toString()&&(a[l]=[Util.DiffOp.Copy,c]);else if("object"!=typeof u||null===u)a[l]=[Util.DiffOp.Copy,c];else{var h=Object.prototype.toString.call(u),d=Object.prototype.toString.call(c);if(h===d)if("[object Date]"===h)+u!==+c&&(a[l]=[Util.DiffOp.CopyDate,+c]);else if("[object RegExp]"===h)u.toString()!==c.toString()&&(a[l]=[Util.DiffOp.Copy,clone(c)]);else{var p=Util.diff(u,c);null!==p&&(a[l]=p)}else a[l]=[Util.DiffOp.Copy,clone(c)]}else a[l]=[Util.DiffOp.Copy,"object"!=typeof c||null===c?c:clone(c)]}else if(n&&Util.isNumeric(l)){var f=+l;if(!r){r="";do r+="~";while(i.some(function(e){return e===this.val},{val:r}));a[r]=[Util.DiffOp.SpliceArray,f,f]}f<a[r][1]&&(a[r][1]=f),f>a[r][2]&&(a[r][2]=f)}else a[l]=Util.DiffOp.Delete;else a[l]=[Util.DiffOp.Copy,"object"!=typeof c||null===c?c:clone(c)]}return 0!==Object.keys(a).length?a:null}},patch:{value:function(e,t){for(var r=Object.keys(t||{}),i=clone(e),a=0,n=r.length;n>a;a++){var s=r[a],o=t[s];if(o===Util.DiffOp.Delete)delete i[s];else if(Array.isArray(o))switch(o[0]){case Util.DiffOp.SpliceArray:i.splice(o[1],1+(o[2]-o[1]));break;case Util.DiffOp.Copy:i[s]=clone(o[1]);break;case Util.DiffOp.CopyDate:i[s]=new Date(o[1])}else i[s]=Util.patch(i[s],o)}return i}},fromCSSTime:{value:function(e){var t=/^([+-]?[0-9]+(?:\.[0-9]+)?)\s*(m?s)$/,r=t.exec(e);if(null===r)throw new Error('invalid time value: "'+e+'"');return"ms"===r[2]?Number(r[1]):1e3*Number(r[1])}},toCSSTime:{value:function(e){if("number"!=typeof e||isNaN(e)||!isFinite(e)){var t;switch(typeof e){case"string":t='"'+e+'"';break;case"number":t=String(e);break;default:t=Object.prototype.toString.call(e)}throw new Error("invalid milliseconds: "+t)}return e+"ms"}},parseUrl:{value:function(e){var t=document.createElement("a"),r=Object.create(null);t.href=e,t.search.replace(/^\?/,"").split(/(?:&(?:amp;)?|;)/).forEach(function(e){var t=e.split("=");r[t[0]]=t[1]});var i=t.host&&"/"!==t.pathname[0]?"/"+t.pathname:t.pathname;return{href:t.href,protocol:t.protocol,host:t.host,hostname:t.hostname,port:t.port,path:i+t.search,pathname:i,query:t.search,search:t.search,queries:r,searches:r,hash:t.hash}}}});Object.defineProperties(Util,{random:{value:Math.random},entityEncode:{value:Util.escape},entityDecode:{value:Util.unescape}}),Object.defineProperties(SeedablePRNG,{marshal:{value:function(e){if(!e||!e.hasOwnProperty("seed")||!e.hasOwnProperty("count"))throw new Error("PRNG is missing required data");return{seed:e.seed,count:e.count}}},unmarshal:{value:function(e){if(!e||!e.hasOwnProperty("seed")||!e.hasOwnProperty("count"))throw new Error("PRNG object is missing required data");for(var t=new SeedablePRNG(e.seed,!1),r=0,i=e.count;i>r;r++)t.random();return t}}}),Object.defineProperties(AudioWrapper.prototype,{duration:{get:function(){return this.audio.duration}},time:{get:function(){return this.audio.currentTime},set:function(e){this.hasMetadata()?this.audio.currentTime=e:jQuery(this.audio).off("loadedmetadata.AudioWrapper:time").one("loadedmetadata.AudioWrapper:time",function(){this.currentTime=e})}},volume:{get:function(){return this.audio.volume},set:function(e){this.audio.volume=Math.clamp(e,0,1)}},controls:{get:function(){return this.audio.controls},set:function(e){this.audio.controls=!!e}},hasMetadata:{value:function(){return this.audio.readyState>=HTMLMediaElement.HAVE_METADATA}},hasData:{value:function(){return this.audio.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA}},noSource:{value:function(){return this.audio.networkState===HTMLMediaElement.NETWORK_NO_SOURCE}},isPlaying:{value:function(){return!(this.audio.ended||this.audio.paused||!this.hasData())}},isEnded:{value:function(){return this.audio.ended}},isPaused:{value:function(){return this.audio.paused}},isMuted:{value:function(){return this.audio.muted}},isLooped:{value:function(){return this.audio.loop}},load:{value:function(){"auto"!==this.audio.preload&&(this.audio.preload="auto"),this.audio.load()}},play:{value:function(){this.hasData()||this.load(),this.audio.play()}},pause:{value:function(){this.audio.pause()}},stop:{value:function(){this.audio.pause(),this.time=0}},mute:{value:function(){this.audio.muted=!0}},unmute:{value:function(){this.audio.muted=!1}},loop:{value:function(){this.audio.loop=!0}},unloop:{value:function(){this.audio.loop=!1}},fadeWithDuration:{value:function(e,t,r){null!==this._faderId&&(clearInterval(this._faderId),this._faderId=null),t=Math.clamp(t,0,1),r=Math.clamp(r,0,1),t!==r&&(this.volume=t,jQuery(this.audio).off("timeupdate.AudioWrapper:fadeWithDuration").one("timeupdate.AudioWrapper:fadeWithDuration",function(i){return function(){var a,n;r>t?(a=t,n=r):(a=r,n=t),e=Math.clamp(e,1,i.duration||5);var s=25,o=(r-t)/(e/(s/1e3));i._faderId=setInterval(function(){return i.isPlaying()?(i.volume=Math.clamp(i.volume+o,a,n),0===i.volume&&i.pause(),void(i.volume===r&&(clearInterval(i._faderId),i._faderId=null))):(clearInterval(i._faderId),void(i._faderId=null))},s)}}(this)),this.play())}},fade:{value:function(e,t){this.fadeWithDuration(5,e,t)}},fadeIn:{value:function(){this.fade(this.volume,1)}},fadeOut:{value:function(){this.fade(this.volume,0)}},onPlay:{value:function(e){"function"==typeof e?jQuery(this.audio).on("playing.AudioWrapper:onPlay",e):jQuery(this.audio).off("playing.AudioWrapper:onPlay")}},onePlay:{value:function(e){"function"==typeof e?jQuery(this.audio).one("playing.AudioWrapper:onePlay",e):jQuery(this.audio).off("playing.AudioWrapper:onePlay")}},onPause:{value:function(e){"function"==typeof e?jQuery(this.audio).on("pause.AudioWrapper:onPause",e):jQuery(this.audio).off("pause.AudioWrapper:onPause")}},onePause:{value:function(e){"function"==typeof e?jQuery(this.audio).one("pause.AudioWrapper:onePause",e):jQuery(this.audio).off("pause.AudioWrapper:onePause");
}},onEnd:{value:function(e){"function"==typeof e?jQuery(this.audio).on("ended.AudioWrapper:onEnd",e):jQuery(this.audio).off("ended.AudioWrapper:onEnd")}},oneEnd:{value:function(e){"function"==typeof e?jQuery(this.audio).one("ended.AudioWrapper:oneEnd",e):jQuery(this.audio).off("ended.AudioWrapper:oneEnd")}},clone:{value:function(){return new AudioWrapper(this.audio.cloneNode(!0))}}});var KeyValueStore=function(){function e(e,i,a){var n=null;switch(e){case"cookie":n=new r(i,a);break;case"webStorage":n=new t(i,a),n._ok||(n=new r(i,a));break;default:throw new Error("unknown driver type")}if(!n._ok)throw new Error("unknown driver error");Object.defineProperties(this,{_driver:{value:n},name:{value:n.name},type:{value:e},id:{value:a},persist:{value:i}})}function t(e,t){var r=null,i=null;e?has.localStorage&&(r=window.localStorage,i="localStorage"):has.sessionStorage&&(r=window.sessionStorage,i="sessionStorage"),Object.defineProperties(this,{_ok:{value:null!==r},_engine:{value:r},_prefix:{value:t+"."},_prefixRe:{value:new RegExp("^"+RegExp.escape(t+"."))},name:{value:i},id:{value:t},persist:{value:e}})}function r(e,t){Object.defineProperties(this,{_ok:{value:"cookie"in document},_prefix:{value:t+"."},_prefixRe:{value:new RegExp("^"+RegExp.escape(t+"."))},name:{value:"cookie"},id:{value:t},persist:{value:e}})}return Object.defineProperties(e.prototype,{length:{get:function(){return null===this._driver?0:this._driver.length}},keys:{value:function(){return null===this._driver?[]:this._driver.keys()}},clear:{value:function(){if(null===this._driver)return!1;for(var e=this.keys(),t=0;t<e.length;t++)this.removeItem(e[t]);return!0}},hasItem:{value:function(e){return null!==this._driver&&e?this._driver.has(e):!1}},getItem:{value:function(e){if(null===this._driver||!e)return null;var t=this._driver.retrieve(e);if(null==t)return null;var r=!1;if("#~"===t.slice(0,2))t=this._driver.deserialize(t.slice(2)),r=!0;else try{t=this._driver.deserialize(t)}catch(e){t=JSON.parse(t),r=!0}if(r&&!this.setItem(e,t,!0))throw new Error('unable to upgrade legacy value for key "'+e+'" to new format');return t}},setItem:{value:function(e,t,r){return null!==this._driver&&e?this._driver.store(e,this._driver.serialize(t),r):!1}},removeItem:{value:function(e){return null!==this._driver&&e?this._driver.remove(e):!1}},removeMatchingItems:{value:function(e){if(null===this._driver||!e)return!1;for(var t=this.keys(),r=new RegExp("^"+RegExp.escape(e)),i=0;i<t.length;i++)r.test(t[i])&&this.removeItem(t[i]);return!0}}}),Object.defineProperties(t.prototype,{serialize:{value:function(e){return LZString.compressToUTF16(JSON.stringify(e))}},deserialize:{value:function(e){return JSON.parse(LZString.decompressFromUTF16(e))}},length:{get:function(){return this.keys().length}},keys:{value:function(){if(null===this._engine)return[];for(var e=[],t=0;t<this._engine.length;t++){var r=this._engine.key(t);this._prefixRe.test(r)&&e.push(r.replace(this._prefixRe,""))}return e}},has:{value:function(e){return null!==this._engine&&e?null!=this._engine.getItem(this._prefix+e):!1}},retrieve:{value:function(e){return null!==this._engine&&e?this._engine.getItem(this._prefix+e):null}},store:{value:function(e,t,r){if(null===this._engine||!e)return!1;try{this._engine.setItem(this._prefix+e,t)}catch(t){return r||technicalAlert(null,'unable to store key "'+e+'"; '+(/quota_?(?:exceeded|reached)/i.test(t.name)?this.name+" quota exceeded":"unknown error"),t),!1}return!0}},remove:{value:function(e){return null!==this._engine&&e?(this._engine.removeItem(this._prefix+e),!0):!1}}}),Object.defineProperties(r.prototype,{_setCookie:{value:function(e,t,r){if("cookie"in document){var i=encodeURIComponent(this._prefix+e)+"=";null!=t&&(i+=encodeURIComponent(t)),null!=r&&(i+="; "+r),i+="; path=/",document.cookie=i}}},_getCookies:{value:function(){var e={};if("cookie"in document&&""!==document.cookie)for(var t=document.cookie.split(/;\s*/),r=0;r<t.length;r++){var i=t[r].split("="),a=decodeURIComponent(i[0]);this._prefixRe.test(a)&&(e[a]=decodeURIComponent(i[1]))}return e}},serialize:{value:function(e){return LZString.compressToBase64(JSON.stringify(e))}},deserialize:{value:function(e){return JSON.parse(LZString.decompressFromBase64(e))}},length:{get:function(){return this.keys().length}},keys:{value:function(){return Object.keys(this._getCookies())}},has:{value:function(e){return e?this._getCookies().hasOwnProperty(this._prefix+e):!1}},retrieve:{value:function(e){if(!e)return null;var t=this._getCookies(),r=this._prefix+e;return t.hasOwnProperty(r)?t[r]:null}},store:{value:function(e,t,r){if(!e)return!1;try{this._setCookie(e,t,this.persist?"Tue, 19 Jan 2038 03:14:07 GMT":undefined)}catch(t){return r||technicalAlert(null,'unable to store key "'+e+'"; cookie error: '+t.message,t),!1}return this.has(e)?!0:(r||technicalAlert(null,'unable to store key "'+e+'"; unknown cookie error'),!1)}},remove:{value:function(e,t){if(!e)return!1;try{this._setCookie(e,undefined,"Thu, 01 Jan 1970 00:00:00 GMT")}catch(r){return t||technicalAlert(null,'unable to remove key "'+e+'"; cookie error: '+r.message,r),!1}return this.has(e)?(t||technicalAlert(null,'unable to remove key "'+e+'"; unknown cookie error'),!1):!0}}}),e}(),SaveSystem=function(){function e(){function e(e,t){for(var r=0;t>r;r++)e.push(null);return e}function t(e){e.hasOwnProperty("data")&&!e.hasOwnProperty("state")?(e.state={mode:e.mode,delta:History.deltaEncodeHistory(e.data)},delete e.mode,delete e.data):e.hasOwnProperty("state")&&!e.state.hasOwnProperty("delta")&&(e.state.delta=History.deltaEncodeHistory(e.state.history),delete e.state.history)}config.saves.slots<0&&(config.saves.slots=0),storage.hasItem("saves")||storage.setItem("saves",{autosave:null,slots:e([],config.saves.slots)});var r=storage.getItem("saves");if(null===r)return x=!0,!1;Array.isArray(r)&&(r={autosave:null,slots:r},storage.setItem("saves",r)),config.saves.slots!==r.slots.length&&(config.saves.slots<r.slots.length?(r.slots.reverse(),r.slots=r.slots.filter(function(e){return null===e&&this.count>0?(this.count--,!1):!0},{count:r.slots.length-config.saves.slots}),r.slots.reverse()):config.saves.slots>r.slots.length&&e(r.slots,config.saves.slots-r.slots.length),storage.setItem("saves",r));var i=!1;null!==r.autosave&&(r.autosave.hasOwnProperty("state")&&r.autosave.state.hasOwnProperty("delta")||(t(r.autosave),i=!0));for(var a=0;a<r.slots.length;a++)null!==r.slots[a]&&(r.slots[a].hasOwnProperty("state")&&r.slots[a].state.hasOwnProperty("delta")||(t(r.slots[a]),i=!0));return i&&storage.setItem("saves",r),E=r.slots.length-1,!0}function t(){return i()||u()}function r(){return storage.removeItem("saves"),e()}function i(){return!x&&"undefined"!=typeof config.saves.autosave}function a(){var e=storage.getItem("saves");return null!==e&&null!==e.autosave}function n(){var e=storage.getItem("saves");return null===e?null:e.autosave}function s(){var e=storage.getItem("saves");return null===e||null===e.autosave?!1:k(e.autosave)}function o(e,t){if("function"==typeof config.saves.isAllowed&&!config.saves.isAllowed())return!1;var r=storage.getItem("saves");return null===r?!1:(r.autosave=b(),r.autosave.title=e||tale.get(state.active.title).description(),r.autosave.date=Date.now(),null!=t&&(r.autosave.metadata=t),storage.setItem("saves",r))}function l(){var e=storage.getItem("saves");return null===e?!1:(e.autosave=null,storage.setItem("saves",e))}function u(){return!x&&-1!==E}function c(){return E+1}function h(){if(!u())return 0;var e=storage.getItem("saves");if(null===e)return 0;for(var t=0,r=0;r<e.slots.length;r++)null!==e.slots[r]&&t++;return t}function d(){return 0===h()}function p(e){if(0>e||e>E)return!1;var t=storage.getItem("saves");return!(null===t||e>=t.slots.length||null===t.slots[e])}function f(e){if(0>e||e>E)return null;var t=storage.getItem("saves");return null===t||e>=t.slots.length?null:t.slots[e]}function g(e){if(0>e||e>E)return!1;var t=storage.getItem("saves");return null===t||e>=t.slots.length||null===t.slots[e]?!1:k(t.slots[e])}function m(e,t,r){if("function"==typeof config.saves.isAllowed&&!config.saves.isAllowed())return UISystem.alert(strings.saves.disallowed),!1;if(0>e||e>E)return!1;var i=storage.getItem("saves");return null===i||e>=i.slots.length?!1:(i.slots[e]=b(),i.slots[e].title=t||tale.get(state.active.title).description(),i.slots[e].date=Date.now(),null!=r&&(i.slots[e].metadata=r),storage.setItem("saves",i))}function y(e){if(0>e||e>E)return!1;var t=storage.getItem("saves");return null===t||e>=t.slots.length?!1:(t.slots[e]=null,storage.setItem("saves",t))}function v(){if("function"==typeof config.saves.isAllowed&&!config.saves.isAllowed())return void UISystem.alert(strings.saves.disallowed);var e=tale.domId+".save",t=LZString.compressToBase64(JSON.stringify(b()));saveAs(new Blob([t],{type:"text/plain;charset=UTF-8"}),e)}function w(e){var t=e.target.files[0],r=new FileReader;jQuery(r).on("load",function(e){return function(t){if(t.target.result){var r;try{r=JSON.parse(/\.json$/i.test(e.name)||/^\{/.test(t.target.result)?t.target.result:LZString.decompressFromBase64(t.target.result))}catch(e){}k(r)}}}(t)),r.readAsText(t)}function b(){var e={id:config.saves.id,state:History.marshalToSave()};return config.saves.version&&(e.version=config.saves.version),"function"==typeof config.saves.onSave&&config.saves.onSave(e),e.state.delta=History.deltaEncodeHistory(e.state.history),delete e.state.history,e}function k(e){try{if(!e||!e.hasOwnProperty("id")||!e.hasOwnProperty("state"))throw e&&e.hasOwnProperty("mode")&&e.hasOwnProperty("id")&&e.hasOwnProperty("data")?new Error("old-style saves seen during unmarshal"):new Error("save is missing required data; either you've loaded a file which isn't a save, or the save has become corrupted");if(e.state.history=History.deltaDecodeHistory(e.state.delta),delete e.state.delta,"function"==typeof config.saves.onLoad&&config.saves.onLoad(e),e.id!==config.saves.id)throw new Error("save is from the wrong "+strings.identity);History.unmarshalFromSave(e.state)}catch(e){return UISystem.alert(e.message[0].toUpperCase()+e.message.slice(1)+".\n\nAborting load."),!1}return!0}var x=!1,E=-1;return Object.defineProperties({},{init:{value:e},OK:{value:t},purge:{value:r},autosaveOK:{value:i},hasAuto:{value:a},getAuto:{value:n},loadAuto:{value:s},saveAuto:{value:o},deleteAuto:{value:l},slotsOK:{value:u},length:{value:c},isEmpty:{value:d},count:{value:h},has:{value:p},get:{value:f},load:{value:g},save:{value:m},delete:{value:y},exportSave:{value:v},importSave:{value:w}})}(),UISystem=function(){function e(){jQuery("#init-no-js, #init-lacking").remove();var e=document.getElementById("store-area"),t=document.createDocumentFragment(),r=document.createElement("div");for(r.innerHTML=tale.has("StoryFormatMarkup")?tale.get("StoryFormatMarkup").text.trim():'<div id="ui-bar"><header id="title" role="banner"><div id="story-banner"></div><h1 id="story-title"></h1><div id="story-subtitle"></div><div id="story-title-separator"></div><p id="story-author"></p></header><div id="story-caption"></div><nav id="menu" role="navigation"><ul id="menu-story"></ul><ul id="menu-core"><li id="menu-saves"><a>Saves</a></li><li id="menu-rewind"><a>Rewind</a></li><li id="menu-restart"><a>Restart</a></li><li id="menu-options"><a>Options</a></li><li id="menu-share"><a>Share</a></li></ul></nav></div><div id="passages" role="main"></div>';r.hasChildNodes();)t.appendChild(r.firstChild);S=insertElement(t,"div","ui-overlay","ui-close"),O=insertElement(t,"div","ui-body"),P=insertElement(t,"a","ui-body-close","ui-close",""),e.parentNode.insertBefore(t,e)}function t(){var e=jQuery(document.documentElement);jQuery("#story-title").empty().append(tale.title),tale.has("StoryCaption")||jQuery("#story-caption").remove(),tale.has("StoryMenu")||tale.has("MenuStory")||jQuery("#menu-story").remove(),r(),w("#menu-saves a",null,function(){i()}),!config.disableHistoryTracking&&tale.lookup("tags","bookmark").length>0?w(jQuery("#menu-rewind a"),null,function(){a()}):jQuery("#menu-rewind").remove(),w("#menu-restart a",null,function(){n()}),tale.has("MenuOptions")?w(jQuery("#menu-options a"),null,function(){s()}):jQuery("#menu-options").remove(),tale.has("MenuShare")?w(jQuery("#menu-share a"),null,function(){o()}):jQuery("#menu-share").remove(),"complete"===document.readyState&&e.removeClass("init-loading"),document.addEventListener("readystatechange",function(){"complete"===document.readyState?config.loadDelay>0?setTimeout(function(){e.removeClass("init-loading")},config.loadDelay):e.removeClass("init-loading"):e.addClass("init-loading")},!1)}function r(){setPageElement("story-banner","StoryBanner"),setPageElement("story-subtitle","StorySubtitle"),setPageElement("story-author","StoryAuthor"),setPageElement("story-caption","StoryCaption");var e=document.getElementById("menu-story");null!==e&&(removeChildren(e),tale.has("StoryMenu")?u("StoryMenu",e):tale.has("MenuStory")&&u("MenuStory",e))}function i(){function e(e,t,r,i){var a=document.createElement("li"),n=document.createElement("button");return n.id="saves-"+e,t&&(n.className=t),n.innerHTML=r,jQuery(n).on("click",i),a.appendChild(n),a}function t(){function e(e,t,r,i,a){var n=document.createElement("button");return n.id="saves-"+e+"-"+i,t&&(n.className=t),n.classList.add(e),n.innerHTML=r,jQuery(n).on("click",function(e){return function(){a(e)}}(i)),n}var t=storage.getItem("saves");if(null===t)return!1;var r,a,n,s,o,l,u,c,h=document.createElement("tbody");SaveSystem.autosaveOK()&&(r=document.createElement("tr"),a=document.createElement("td"),n=document.createElement("td"),s=document.createElement("td"),o=document.createElement("td"),u=document.createElement("b"),u.innerHTML="A",a.appendChild(u),t.autosave&&t.autosave.state.mode===config.historyMode?(l=document.createElement("button"),l.id="saves-load-autosave",l.classList.add("load"),l.classList.add("ui-close"),l.innerHTML="Load",jQuery(l).on("click",SaveSystem.loadAuto),n.appendChild(l),u=document.createTextNode(t.autosave.title),s.appendChild(u),s.appendChild(document.createElement("br")),u=document.createElement("small"),u.innerHTML="Autosaved ("+new Date(t.autosave.date).toLocaleString()+")",s.appendChild(u),c=document.createElement("button"),c.id="saves-delete-autosave",c.classList.add("delete"),c.innerHTML="Delete",jQuery(c).on("click",function(){SaveSystem.deleteAuto(),i()}),o.appendChild(c)):(u=document.createElement("i"),u.innerHTML="(autosave slot empty)",s.appendChild(u),s.classList.add("empty")),r.appendChild(a),r.appendChild(n),r.appendChild(s),r.appendChild(o),h.appendChild(r));for(var d=0;d<t.slots.length;d++)r=document.createElement("tr"),a=document.createElement("td"),n=document.createElement("td"),s=document.createElement("td"),o=document.createElement("td"),a.appendChild(document.createTextNode(d+1)),t.slots[d]&&t.slots[d].state.mode===config.historyMode?(l=e("load","ui-close","Load",d,SaveSystem.load),n.appendChild(l),u=document.createTextNode(t.slots[d].title),s.appendChild(u),s.appendChild(document.createElement("br")),u=document.createElement("small"),t.slots[d].date?u.innerHTML="Saved ("+new Date(t.slots[d].date).toLocaleString()+")":u.innerHTML="Saved (<i>unknown</i>)",s.appendChild(u),c=e("delete",null,"Delete",d,function(e){SaveSystem.delete(e),i()}),o.appendChild(c)):(l=e("save","ui-close","Save",d,SaveSystem.save),n.appendChild(l),u=document.createElement("i"),u.innerHTML="(save slot empty)",s.appendChild(u),s.classList.add("empty")),r.appendChild(a),r.appendChild(n),r.appendChild(s),r.appendChild(o),h.appendChild(r);var p=document.createElement("table");return p.id="saves-list",p.appendChild(h),p}function r(){var e=document.createElement("div"),t=document.createElement("div"),r=document.createElement("input");return t.id="saves-import-label",t.appendChild(document.createTextNode("Select a save file to load:")),e.appendChild(t),r.type="file",r.id="saves-import-file",r.name="saves-import-file",jQuery(r).on("change",function(e){SaveSystem.importSave(e),k()}),e.appendChild(r),e}var a,n,s=SaveSystem.OK();return jQuery(O).empty().removeClass().addClass("saves"),s&&(a=t(),a||(a=document.createElement("div"),a.id="saves-list",a.innerHTML="<i>No save slots found</i>"),O.appendChild(a)),s||has.fileAPI?(n=document.createElement("div"),a=document.createElement("ul"),has.fileAPI&&(a.appendChild(e("export","ui-close","Save to Disk…",SaveSystem.exportSave)),a.appendChild(e("import",null,"Load from Disk…",function(e){document.getElementById("saves-import-file")||O.appendChild(r())}))),s&&a.appendChild(e("purge",null,"Purge Slots",function(e){SaveSystem.purge(),i()})),n.appendChild(a),O.appendChild(n),!0):(c("Apologies! Your browser either lacks some of the capabilities required to support saves or has disabled them.\n\nThe former may be solved by updating it to a newer version or by switching to a more modern browser.\n\nThe latter may be solved by loosening its security restrictions or, perhaps, by viewing the "+strings.identity+" via the HTTP protocol."),!1)}function a(){var e=document.createElement("ul");jQuery(O).empty().removeClass().addClass("dialog-list rewind").append(e);for(var t=0,r=state.length-1;r>t;t++){var i=tale.get(state.history[t].title);if(i&&i.tags.contains("bookmark")){var a=document.createElement("li"),n=document.createElement("a");n.classList.add("ui-close"),jQuery(n).on("click",function(){var e=t;return config.historyMode===History.Modes.Session?function(){if(document.title=tale.title,state.regenerateSuid(),config.disableHistoryControls)History.replaceWindowState({suid:state.suid,sidx:state.history[e].sidx},config.displayPassageTitles&&state.history[e].title!==config.startPassage?tale.title+": "+state.history[e].title:tale.title);else for(var t=0,r=e;r>=t;t++)History.addWindowState({suid:state.suid,sidx:state.history[t].sidx},config.displayPassageTitles&&state.history[t].title!==config.startPassage?tale.title+": "+state.history[t].title:tale.title);var i=History.getWindowState();null!==i&&i.sidx<state.top.sidx&&state.pop(state.top.sidx-i.sidx),state.setActiveState(state.top),state.display(state.active.title,null,"replace")}:config.historyMode===History.Modes.Window?function(){if(document.title=tale.title,!config.disableHistoryControls)for(var t=0,r=e;r>=t;t++){var i={history:state.history.slice(0,t+1)};state.hasOwnProperty("prng")&&(i.rseed=state.prng.seed),History.addWindowState(i,config.displayPassageTitles&&state.history[t].title!==config.startPassage?tale.title+": "+state.history[t].title:tale.title)}state.pop(state.length-(e+1)),state.setActiveState(state.top),state.display(state.active.title,null,"replace")}:function(){config.disableHistoryControls?(session.setItem("activeHash",state.history[e].hash),window.location.reload()):window.location.hash=state.history[e].hash}}()),n.appendChild(document.createTextNode("Turn "+(t+1)+": "+i.description())),a.appendChild(n),e.appendChild(a)}}if(!e.hasChildNodes()){var a=document.createElement("li"),n=document.createElement("a");n.innerHTML="<i>No rewind points available…</i>",a.appendChild(n),e.appendChild(a)}}function n(){return jQuery(O).empty().removeClass().addClass("dialog restart").append('<p>Are you sure that you want to restart?  Unsaved progress will be lost.</p><ul class="buttons"><li><button id="restart-ok" class="ui-close">OK</button></li><li><button id="restart-cancel" class="ui-close">Cancel</button></li></ul>'),jQuery("#ui-body #restart-ok").one("click",function(){state.restart()}),!0}function s(){return jQuery(O).empty().removeClass().addClass("dialog options"),new Wikifier(O,tale.get("MenuOptions").processText().trim()),!0}function o(){return jQuery(O).empty().removeClass().addClass("dialog-list share").append(u("MenuShare")),!0}function l(){return jQuery(O).empty().removeClass().addClass("dialog autoload").append("<p>"+strings.saves.autoloadPrompt+'</p><ul class="buttons"><li><button id="autoload-ok" class="ui-close">'+strings.saves.autoloadPromptOK+'</button></li><li><button id="autoload-cancel" class="ui-close">'+strings.saves.autoloadPromptCancel+"</button></li></ul>"),jQuery(document.body).one("click.autoload",".ui-close",function(e){"autoload-ok"===e.target.id&&SaveSystem.loadAuto()||state.display(config.startPassage)}),!0}function u(e,t){null==t&&(t=document.createElement("ul"));var r=document.createDocumentFragment();if(new Wikifier(r,tale.get(e).processText().trim()),r.hasChildNodes())for(var i=null;r.hasChildNodes();){var a=r.firstChild;a.nodeType===Node.TEXT_NODE||a.nodeType===Node.ELEMENT_NODE&&"BR"!==a.nodeName.toUpperCase()?(null===i&&(i=document.createElement("li"),t.appendChild(i)),i.appendChild(a)):(r.removeChild(a),null!==i&&(i=null))}return t}function c(e,t,r){jQuery(O).empty().addClass("dialog alert").append("<p>"+e+'</p><ul class="buttons"><li><button id="alert-ok" class="ui-close">OK</button></li></ul>'),b(t,r)}function h(e){n(),b(e)}function d(){s(),b.apply(null,arguments)}function p(){a(),b.apply(null,arguments)}function f(){i(),b.apply(null,arguments)}function g(){o(),b.apply(null,arguments)}function m(e){return document.documentElement.classList.contains("ui-open")&&(e?O.classList.contains(e):!0)}function y(){return O}function v(e){return jQuery(O).empty().removeClass().addClass("dialog"),null!=e&&jQuery(O).addClass(e),O}function w(e,t,r,i,a){jQuery(e).on("click",function(e){e.preventDefault(),"function"==typeof r&&r(e),b(t,a),"function"==typeof i&&i(e)})}function b(e,t){e=jQuery.extend({top:50,opacity:.8},e),jQuery(document.body).on("click.uisystem-close",".ui-close",t,k),jQuery(S).css({display:"block",opacity:0}).fadeTo(200,e.opacity),e.resizeOnImagesLoaded&&jQuery(O).imagesLoaded().always(function(e){return function(){x({data:e})}}(e.top));var r=E(e.top);jQuery(O).css(jQuery.extend({display:"block",opacity:0},r.dialog)).fadeTo(200,1),jQuery(P).css(jQuery.extend({display:"block",opacity:0},r.closer)).fadeTo(50,1),jQuery(document.documentElement).addClass("ui-open"),jQuery(window).on("resize.uisystem",null,e.top,jQuery.debounce(40,x))}function k(e){jQuery(window).off("resize.uisystem"),jQuery(document.documentElement).removeClass("ui-open"),jQuery(O).css({display:"none",opacity:0,left:"",right:"",top:"",bottom:""}).removeClass().empty(),jQuery(P).css({display:"none",opacity:0,right:"",top:""}),jQuery(S).fadeOut(200),jQuery(document.body).off("click.uisystem-close"),e&&"function"==typeof e.data&&e.data(e)}function x(e){var t=jQuery(O),r=jQuery(P),i=e&&"undefined"!=typeof e.data?e.data:50;if("block"===t.css("display")){t.css({display:"none",left:"",right:"",top:"",bottom:""}),r.css({display:"none",right:"",top:""});var a=E(i);t.css(jQuery.extend({display:"block"},a.dialog)),r.css(jQuery.extend({display:"block"},a.closer))}}function E(e){"undefined"==typeof e&&(e=50);var t=jQuery(window),r=jQuery(O),i={left:"",right:"",top:"",bottom:""},a=jQuery(P),n={right:"",top:""},s=t.width()-r.outerWidth(!0),o=t.height()-r.outerHeight(!0);return 32>=s?i.left=i.right=16:i.left=i.right=~~(s/2),32>=o?i.top=i.bottom=16:o/2>e?i.top=e:i.top=i.bottom=~~(o/2),n.right=i.right-a.outerWidth(!0)+6+"px",n.top=i.top-a.outerHeight(!0)+6+"px",Object.keys(i).forEach(function(e){""!==i[e]&&(i[e]+="px")}),{dialog:i,closer:n}}var S=null,O=null,P=null;return Object.defineProperties({},{init:{value:e},start:{value:t},setPageElements:{value:r},buildDialogSaves:{value:i},buildDialogRewind:{value:a},buildDialogRestart:{value:n},buildDialogOptions:{value:s},buildDialogShare:{value:o},buildDialogAutoload:{value:l},buildListFromPassage:{value:u},alert:{value:c},restart:{value:h},options:{value:d},rewind:{value:p},saves:{value:f},share:{value:g},isOpen:{value:m},body:{value:y},setup:{value:v},addClickHandler:{value:w},open:{value:b},close:{value:k},show:{value:b}})}();History.Modes=Object.freeze({Hash:1,Window:2,Session:3}),Object.defineProperties(History.prototype,{top:{get:function(){return 0!==this.history.length?this.history[this.history.length-1]:null}},bottom:{get:function(){return 0!==this.history.length?this.history[0]:null}},length:{get:function(){return config.historyMode===History.Modes.Session?this.active.sidx+1:this.history.length}},isEmpty:{value:function(){return 0===this.history.length}},marshal:{value:function(e){var t={delta:History.deltaEncodeHistory(null!=e?this.history.slice(0,e):this.history)};return this.hasOwnProperty("prng")&&(t.rseed=this.prng.seed),t}},unmarshal:{value:function(e){if(null==e)throw new Error("History.prototype.unmarshal stateObj parameter is null or undefined");if(!e.hasOwnProperty("delta")||0===e.delta.length)throw new Error("History.prototype.unmarshal state object has no history or history is empty");this.history=History.deltaDecodeHistory(e.delta),this.hasOwnProperty("prng")&&e.hasOwnProperty("rseed")&&(this.prng.seed=e.rseed)}},has:{value:function(e){return this.isEmpty()?!1:0===arguments.length||null==e||""===e?!1:this.history.slice(0,this.length).some(function(t){return t.title===e})}},index:{value:function(e){return this.isEmpty()?null:0>e||e>=this.length?null:this.history[e]}},peek:{value:function(e){return this.isEmpty()?null:(e=1+(e?Math.abs(e):0),e>this.length?null:this.history[this.length-e])}},push:{value:function(){if(0!==arguments.length){for(var e=0;e<arguments.length;e++){var t=arguments[e];config.historyMode===History.Modes.Session&&(t.sidx=this.history.length),this.history.push(t)}return this.history.length}}},pop:{value:function(e){return this.isEmpty()?[]:(e=e?Math.abs(e):1,1===e?this.history.pop():this.history.splice(this.history.length-e,e))}},setActiveState:{value:function(e){if(0!==arguments.length){if(null==e)throw new Error("state activation attempted with null or undefined");if("object"==typeof e)this.active=clone(e);else{if(this.isEmpty())return null;if(0>e||e>=this.history.length)return null;this.active=clone(this.history[e])}return this.prng&&(this.prng=SeedablePRNG.unmarshal({seed:this.prng.seed,count:this.active.rcount})),this.active}}},init:{value:function(){if(tale.has("StoryInit"))try{Wikifier.wikifyEval(tale.get("StoryInit").text)}catch(e){technicalAlert("StoryInit",e.message)}config.disableHistoryTracking&&(config.disableHistoryControls=!0);var e;if("undefined"!=typeof e&&""!==e)this.display(e);else{if(null==config.startPassage||!tale.has(config.startPassage))throw new Error("starting passage "+(null==config.startPassage?"not selected":'("'+config.startPassage+'") not found'));if(!this.restore()){var t=!0;switch(typeof config.saves.autoload){case"boolean":config.saves.autoload&&SaveSystem.autosaveOK()&&(t=!SaveSystem.loadAuto());break;case"string":"prompt"===config.saves.autoload&&SaveSystem.autosaveOK()&&SaveSystem.hasAuto()&&(t=!1,UISystem.buildDialogAutoload(),UISystem.open());break;case"function":SaveSystem.autosaveOK()&&SaveSystem.hasAuto()&&config.saves.autoload()&&(t=!SaveSystem.loadAuto())}t&&this.display(config.startPassage)}}config.historyMode===History.Modes.Session?window.addEventListener("popstate",History.popStateHandler_Session,!1):config.historyMode===History.Modes.Window?window.addEventListener("popstate",History.popStateHandler_Window,!1):window.addEventListener("hashchange",History.hashChangeHandler,!1)}},display:{writable:!0,value:function(e,t,r){var i="hidden"!==r&&"offscreen"!==r&&"quietly"!==r&&r!==!1,a="replace"!==r&&"back"!==r;runtime.temp={};var n=tale.get(e),s=config.displayPassageTitles&&n.title!==config.startPassage?n.title+" | "+tale.title:tale.title;if(Object.keys(prehistory).forEach(function(e){"function"==typeof prehistory[e]&&prehistory[e].call(this,e)},n),this.active.init&&!this.isEmpty()&&(config.historyMode===History.Modes.Session?this.setActiveState(History.hasWindowState()?History.getWindowState().sidx:this.top):this.setActiveState(this.top)),a){if(!this.isEmpty())if(config.disableHistoryTracking)this.pop();else if(config.historyMode===History.Modes.Session){var o=History.getWindowState();null!==o&&o.sidx<this.top.sidx&&this.pop(this.top.sidx-o.sidx)}this.push({title:n.title,variables:clone(this.active.variables)}),this.prng&&(this.top.rcount=this.prng.count),this.setActiveState(this.top)}if((a||config.disableHistoryControls)&&config.historyMode!==History.Modes.Hash){var l;l=config.historyMode===History.Modes.Session?{suid:this.suid,sidx:this.active.sidx}:this.marshal(),History[!History.hasWindowState()||config.disableHistoryControls?"replaceWindowState":"addWindowState"](l,s)}if(config.historyMode!==History.Modes.Window&&this.save(),i&&(document.body.className&&(document.body.className=""),Object.keys(predisplay).forEach(function(e){"function"==typeof predisplay[e]&&predisplay[e].call(this,e)},n),tale.has("PassageReady")))try{Wikifier.wikifyEval(tale.get("PassageReady").text)}catch(e){technicalAlert("PassageReady",e.message)}var u=n.render();if(u.style.visibility="visible",i){var c=document.getElementById("passages"),h=c.querySelector(".passage");null!==h&&("number"==typeof config.passageTransitionOut||"boolean"==typeof config.passageTransitionOut&&config.passageTransitionOut&&""!==config.transitionEndEventName)?(h.id="out-"+h.id,h.classList.add("transition-out"),"boolean"==typeof config.passageTransitionOut?jQuery(h).on(config.transitionEndEventName,function(){this.parentNode&&this.parentNode.removeChild(this)}):setTimeout(function(){h.parentNode&&h.parentNode.removeChild(h)},config.passageTransitionOut)):removeChildren(c),u.classList.add("transition-in"),c.appendChild(u),setTimeout(function(){u.classList.remove("transition-in")},1),config.displayPassageTitles&&n.title!==config.startPassage&&(document.title=s),config.historyMode===History.Modes.Hash&&(window.location.hash=this.hash),window.scroll(0,0)}if(i){if(tale.has("PassageDone"))try{Wikifier.wikifyEval(tale.get("PassageDone").text)}catch(e){technicalAlert("PassageDone",e.message)}Object.keys(postdisplay).forEach(function(e){"function"==typeof postdisplay[e]&&postdisplay[e].call(this,e)},n),config.updatePageElements&&UISystem.setPageElements()}switch(typeof config.saves.autosave){case"boolean":config.saves.autosave&&SaveSystem.saveAuto();break;case"string":n.tags.contains(config.saves.autosave)&&SaveSystem.saveAuto();break;case"object":Array.isArray(config.saves.autosave)&&n.tags.some(function(e){return config.saves.autosave.contains(e)})&&SaveSystem.saveAuto()}return u}},regenerateSuid:{value:function(){this.suid=UUID.generate(),this.save()}},restart:{value:function(){config.historyMode!==History.Modes.Hash?(History.addWindowState(null,tale.title),window.location.reload()):window.location.hash=""}},save:{value:function(){var e=this.marshal();config.historyMode===History.Modes.Session?session.setItem("history."+this.suid,e):config.historyMode===History.Modes.Hash&&(this.hash=History.serializeWindowHashState(e))}},restore:{value:function(e){if(config.historyMode===History.Modes.Session){if(e)this.suid=e;else{if(!History.hasWindowState())return this.suid=UUID.generate(),!1;this.suid=History.getWindowState().suid}if(session.hasItem("history."+this.suid)){var t=session.getItem("history."+this.suid),r=History.getWindowState().sidx;if(this.unmarshal(t),tale.has(this.history[r].title))return this.display(this.history[r].title,null,"replace"),!0}}else if(config.historyMode===History.Modes.Window){if(History.hasWindowState()&&this.unmarshal(History.getWindowState()),!this.isEmpty()&&tale.has(this.top.title))return this.display(this.top.title,null,"replace"),!0}else if(History.hasWindowHashState())return this.hash||History.hashChangeHandler(),!0;return!1}}}),Object.defineProperties(History,{serializeWindowState:{value:function(e){return LZString.compressToUTF16(JSON.stringify(e))}},deserializeWindowState:{value:function(e){return JSON.parse(LZString.decompressFromUTF16(e))}},hasWindowState:{value:function(e){return 0===arguments.length&&(e=window.history),null!=e.state}},getWindowState:{value:function(e){return 0===arguments.length&&(e=window.history),null!=e.state?History.deserializeWindowState(e.state):null}},addWindowState:{value:function(e,t,r){null!=r?window.history.pushState(null!=e?History.serializeWindowState(e):null,t,r):window.history.pushState(null!=e?History.serializeWindowState(e):null,t);
}},replaceWindowState:{value:function(e,t,r){null!=r?window.history.replaceState(null!=e?History.serializeWindowState(e):null,t,r):window.history.replaceState(null!=e?History.serializeWindowState(e):null,t)}},serializeWindowHashState:{value:function(e){return"#"+LZString.compressToBase64(JSON.stringify(e)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,".")}},deserializeWindowHashState:{value:function(e){return JSON.parse(LZString.decompressFromBase64(e.slice(1).replace(/\-/g,"+").replace(/_/g,"/").replace(/\./g,"=")))}},hasWindowHashState:{value:function(e){return 0===arguments.length&&(e=window.location.hash),""!==e&&"#"!==e}},getWindowHashState:{value:function(e){return 0===arguments.length&&(e=window.location.hash),""!==e&&"#"!==e?History.deserializeWindowHashState(e):null}},popStateHandler_Session:{value:function(e){if(History.hasWindowState(e)){UISystem.isOpen()&&UISystem.close();var t=History.getWindowState(e);t.suid!==state.suid&&(state.save(),state.restore(t.suid)),state.display(state.setActiveState(t.sidx).title,null,"replace")}}},popStateHandler_Window:{value:function(e){if(History.hasWindowState(e)){UISystem.isOpen()&&UISystem.close();var t=History.getWindowState(e);state.unmarshal(t),state.display(state.setActiveState(state.top).title,null,"replace")}}},hashChangeHandler:{value:function(e){if(window.location.hash!==state.hash){if(History.hasWindowHashState()){UISystem.isOpen()&&UISystem.close();var t=History.getWindowHashState();state.unmarshal(t),state.display(state.setActiveState(state.top).title,null,"replace")}else window.location.reload();window.location.hash!==state.hash&&(state.hash=window.location.hash)}}},initPRNG:{value:function(e,t){runtime.flags.HistoryPRNG.isEnabled=!0,state.prng=new SeedablePRNG(e,t),state.active.rcount=state.prng.count,runtime.flags.HistoryPRNG.isMathPRNG||(runtime.flags.HistoryPRNG.isMathPRNG=!0,Math.random=function(){return state.prng.random()})}},deltaEncodeHistory:{value:function(e){if(!Array.isArray(e))return null;if(0===e.length)return[];for(var t=[clone(e[0])],r=1,i=e.length;i>r;r++)t.push(Util.diff(e[r-1],e[r]));return t}},deltaDecodeHistory:{value:function(e){if(!Array.isArray(e))return null;if(0===e.length)return[];for(var t=[clone(e[0])],r=1,i=e.length;i>r;r++)t.push(Util.patch(t[r-1],e[r]));return t}},marshalToSave:{value:function(){var e={mode:config.historyMode};return state.hasOwnProperty("prng")&&(e.rseed=state.prng.seed),config.historyMode===History.Modes.Session?e.history=clone(state.history.slice(0,state.active.sidx+1)):e.history=clone(state.history),e}},unmarshalFromSave:{value:function(e){if(!e||!e.hasOwnProperty("mode")||!e.hasOwnProperty("history")&&!e.hasOwnProperty("delta"))throw new Error("state object is missing required data");if(e.mode!==config.historyMode)throw new Error("state object is from an incompatible history mode");if(document.title=tale.title,state=new History,runtime.flags.HistoryPRNG.isEnabled&&History.initPRNG(e.hasOwnProperty("rseed")?e.rseed:null),config.historyMode===History.Modes.Session&&state.regenerateSuid(),state.history=clone(e.history),config.historyMode!==History.Modes.Hash&&!config.disableHistoryControls)for(var t=0,r=state.history.length;r>t;t++){var i,a=config.displayPassageTitles&&state.history[t].title!==config.startPassage?state.history[t].title+" | "+tale.title:tale.title;switch(config.historyMode){case History.Modes.Session:i={suid:state.suid,sidx:state.history[t].sidx};break;case History.Modes.Window:i=state.marshal(t+1)}History.addWindowState(i,a)}state.setActiveState(state.top),state.display(state.active.title,null,"replace")}}}),Object.defineProperties(Passage.prototype,{className:{get:function(){return this.classes.join(" ")}},text:{get:function(){return null==this.element?String.format('<span class="error" title="{0}">Error: the passage "{0}" does not exist</span>',Util.escape(this.title)):this.element.textContent.replace(/\r/g,"")}},description:{value:function(){if(null!=config.altPassageDescription)switch(typeof config.altPassageDescription){case"boolean":if(config.altPassageDescription)return this.title;break;case"object":if(config.altPassageDescription.hasOwnProperty(this.title))return config.altPassageDescription[this.title];break;case"function":var e=config.altPassageDescription.call(this);if(e)return e;break;default:throw new TypeError("config.altPassageDescription must be a boolean, object, or function")}return null==this._excerpt?Passage.getExcerptFromText(this.text):this._excerpt}},processText:{value:function(){var e=this.text;return this.tags.contains("nobr")&&(e=e.replace(/^\n+|\n+$/g,"").replace(/\n+/g," ")),this.tags.contains("Twine.image")&&(e="[img["+e+"]]"),e}},render:{value:function(){var e=insertElement(null,"section",this.domId,"passage");e.setAttribute("data-passage",this.title),e.style.visibility="hidden";for(var t=0;t<this.classes.length;t++)document.body.classList.add(this.classes[t]),e.classList.add(this.classes[t]);insertElement(e,"header",null,"header");var r=insertElement(e,"div",null,"body content");return insertElement(e,"footer",null,"footer"),Object.keys(prerender).forEach(function(e){"function"==typeof prerender[e]&&prerender[e].call(this,r,e)},this),new Wikifier(r,this.processText()),Object.keys(postrender).forEach(function(e){"function"==typeof postrender[e]&&postrender[e].call(this,r,e)},this),this._excerpt=Passage.getExcerptFromNode(r),e}},reset:{value:function(){throw new Error("Passage.prototype.reset was called")}}}),Object.defineProperties(Passage,{getExcerptFromNode:{value:function(e,t){if(!e.hasChildNodes())return"";var r=new RegExp("(\\S+(?:\\s+\\S+){0,"+("undefined"!=typeof t?t-1:7)+"})"),i=e.textContent.trim();return""!==i&&(i=i.replace(/\s+/g," ").match(r)),i?i[1]+"…":"…"}},getExcerptFromText:{value:function(e,t){if(""===e)return"";var r=new RegExp("(\\S+(?:\\s+\\S+){0,"+("undefined"!=typeof t?t-1:7)+"})"),i=e.replace(/<<.*?>>/g," ").replace(/<.*?>/g," ").trim().replace(/^\s*\|.*\|.*?$/gm,"").replace(/\[[<>]?img\[[^\]]*\]\]/g,"").replace(/\[\[([^|\]]*)(?:|[^\]]*)?\]\]/g,"$1").replace(/^\s*!+(.*?)$/gm,"$1").replace(/\'{2}|\/{2}|_{2}|@{2}/g,"").trim().replace(/\s+/g," ").match(r);return i?i[1]+"…":"…"}}}),Object.defineProperties(Tale.prototype,{title:{get:function(){return this._title},set:function(e){if(null==e||""===e)throw new Error("story title cannot be null or empty");document.title=this._title=e,this._domId=Util.slugify(e)}},domId:{get:function(){return this._domId}},init:{value:function(){}},has:{value:function(e){switch(typeof e){case"number":e+="";case"string":return this.passages.hasOwnProperty(e);default:throw new TypeError("Tale.prototype.has title parameter must be a string")}}},get:{value:function(e){switch(typeof e){case"number":e+="";case"string":return this.passages.hasOwnProperty(e)?this.passages[e]:new Passage(e||"(unknown)");default:throw new TypeError("Tale.prototype.get title parameter must be a string")}}},lookup:{value:function(e,t,r){r||(r="title");for(var i=Object.keys(this.passages),a=[],n=0;n<i.length;n++){var s=this.passages[i[n]];if(s.hasOwnProperty(e))switch(typeof s[e]){case"undefined":break;case"object":for(var o=0,l=s[e].length;l>o;o++)if(s[e][o]==t){a.push(s);break}break;default:s[e]==t&&a.push(s)}}return a.sort(function(e,t){return e[r]==t[r]?0:e[r]<t[r]?-1:1}),a}},reset:{value:function(){throw new Error("Tale.prototype.reset was called")}}});var Wikifier=function(){function e(r,i){this.formatter=t||e.compileFormatters(),this.output=null!=r?r:document.createElement("div"),this.source=i,this.nextMatch=0,this._rawArgs="",this._nobr=[],this.subWikify(this.output),null==r&&"function"==typeof this.output.remove&&this.output.remove()}var t,r=/[\u0150\u0170]/g.test("Ő");return Object.defineProperties(e.prototype,{subWikify:{value:function(e,t,r){var i=this.output;this.output=e;var a,n,s=t?new RegExp("(?:"+t+")",r?"gim":"gm"):null;do{if(this.formatter.formatterRegExp.lastIndex=this.nextMatch,s&&(s.lastIndex=this.nextMatch),n=this.formatter.formatterRegExp.exec(this.source),a=s?s.exec(this.source):null,a&&(!n||a.index<=n.index))return a.index>this.nextMatch&&this.outputText(this.output,this.nextMatch,a.index),this.matchStart=a.index,this.matchLength=a[0].length,this.matchText=a[0],this.nextMatch=s.lastIndex,void(this.output=i);if(n){n.index>this.nextMatch&&this.outputText(this.output,this.nextMatch,n.index),this.matchStart=n.index,this.matchLength=n[0].length,this.matchText=n[0],this.nextMatch=this.formatter.formatterRegExp.lastIndex;for(var o=-1,l=1;l<n.length;l++)if(n[l]){o=l-1;break}if(-1!==o&&(this.formatter.formatters[o].handler(this),null!=runtime.temp.break))break}}while(a||n);null==runtime.temp.break?this.nextMatch<this.source.length&&(this.outputText(this.output,this.nextMatch,this.source.length),this.nextMatch=this.source.length):this.output.lastChild&&this.output.lastChild.nodeType===Node.ELEMENT_NODE&&"BR"===this.output.lastChild.nodeName.toUpperCase()&&removeElement(this.output.lastChild),this.output=i}},outputText:{value:function(e,t,r){insertText(e,this.source.substring(t,r))}},rawArgs:{value:function(){return this._rawArgs}},fullArgs:{value:function(){return e.parse(this.rawArgs())}}}),Object.defineProperties(e,{compileFormatters:{value:function(){for(var r=e.formatters,i=[],a=0,n=r.length;n>a;a++)i.push("("+r[a].match+")");return t={formatters:r,formatterRegExp:new RegExp(i.join("|"),"gm")}}},parse:{value:function(e){for(var t,r=new RegExp("(?:(?:\"((?:(?:\\\\\")|[^\"])+)\")|(?:'((?:(?:\\\\')|[^'])+)')|((?:\"\")|(?:''))|([=+\\-*\\/%<>&\\|\\^~!?:,;\\(\\)\\[\\]{}]+)|([^\"'=+\\-*\\/%<>&\\|\\^~!?:,;\\(\\)\\[\\]{}\\s]+))","g"),i={$:"state.active.variables.",to:"=",eq:"==",neq:"!=",is:"===",isnot:"!==",gt:">",gte:">=",lt:"<",lte:"<=",and:"&&",or:"||",not:"!",def:'"undefined" !== typeof',ndef:'"undefined" === typeof'};null!==(t=r.exec(e));)if(t[5]){var a=t[5];if("$"===a)continue;if("$"===a[0])a="$";else if("is"===a){var n=r.lastIndex,s=e.slice(n);/^\s+not\b/.test(s)&&(e=e.splice(n,s.search(/\S/)),a="isnot")}i.hasOwnProperty(a)&&(e=e.splice(t.index,a.length,i[a]),r.lastIndex+=i[a].length-a.length)}return e}},getValue:{value:function(t){var r=e.parseStoryVariable(t),i=undefined;if(0!==r.length){i=state.active.variables;for(var a=0,n=r.length;n>a;a++){if("undefined"==typeof i[r[a]]){i=undefined;break}i=i[r[a]]}}return i}},setValue:{value:function(t,r){var i=e.parseStoryVariable(t);if(0!==i.length){for(var a=state.active.variables,n=i.pop(),s=0,o=i.length;o>s;s++){if("undefined"==typeof a[i[s]]){a=undefined;break}a=a[i[s]]}if(a!==undefined)return a[n]=r,!0}return!1}},parseStoryVariable:{value:function(t){for(var r,i=/^(?:\$(\w+)|\.(\w+)|\[(?:(?:\"((?:\\.|[^\"\\])+)\")|(?:\'((?:\\.|[^\'\\])+)\')|(\$\w.*)|(\d+))\])/,a=[];null!==(r=i.exec(t));)t=t.slice(r[0].length),r[1]?a.push(r[1]):r[2]?a.push(r[2]):r[3]?a.push(r[3]):r[4]?a.push(r[4]):r[5]?a.push(e.getValue(r[5])):r[6]&&a.push(Number(r[6]));return""===t?a:[]}},evalExpression:{value:function(t){return Util.evalExpression(e.parse(t))}},evalStatements:{value:function(t){return Util.evalStatements(e.parse(t))}},wikifyEval:{value:function(t){var r=document.createDocumentFragment();try{for(new e(r,t);r.hasChildNodes();){var i=r.firstChild;if(i.classList&&i.classList.contains("error"))throw new Error(i.textContent);r.removeChild(i)}}catch(e){throw new Error(e.message.replace(/^Error:\s+/,""))}finally{removeChildren(r)}}},createInternalLink:{value:function(e,t,r,i){var a=document.createElement("a");return null!=t&&(a.setAttribute("data-passage",t),tale.has(t)?(a.classList.add("link-internal"),config.addVisitedLinkClass&&state.has(t)&&a.classList.add("link-visited")):a.classList.add("link-broken"),jQuery(a).click(function(){"function"==typeof i&&i(),state.display(t,a)})),r&&insertText(a,r),e&&e.appendChild(a),a}},createExternalLink:{value:function(e,t,r){var i=insertElement(e,"a",null,"link-external",r);return i.target="_blank",null!=t&&(i.href=t),i}},isExternalLink:{value:function(t){if(tale.has(t))return!1;var r=new RegExp("^"+e.textPrimitives.url,"gim");return r.test(t)||/[\.\/\\#]/.test(t)}}}),Object.defineProperty(e,"textPrimitives",{value:{}}),Object.defineProperties(e.textPrimitives,{anyLetter:{value:r?"[A-Za-z0-9_\\-À-ž]":"[A-Za-z0-9_\\-À-ÿ]"},url:{value:"(?:file|https?|mailto|ftp|javascript|irc|news|data):[^\\s'\"]+(?:/|\\b)"}}),Object.defineProperties(e.textPrimitives,{inlineCSS:{value:["(?:("+e.textPrimitives.anyLetter+"+)\\(([^\\)\\|\\n]+)\\):)","(?:("+e.textPrimitives.anyLetter+"+):([^;\\|\\n]+);)","(?:((?:\\."+e.textPrimitives.anyLetter+"+)+);)"].join("|")}}),Object.defineProperty(e,"helpers",{value:{}}),Object.defineProperties(e.helpers,{charFormat:{value:function(e){e.subWikify(insertElement(e.output,this.element),this.terminator)}},inlineCSS:{value:function(t){var r={styles:[],classes:[]},i=new RegExp(e.textPrimitives.inlineCSS,"gm");do{i.lastIndex=t.nextMatch;var a=i.exec(t.source),n=a&&a.index===t.nextMatch;n&&(a[1]?r.styles.push({style:e.helpers.cssToDOMName(a[1]),value:a[2].trim()}):a[3]?r.styles.push({style:e.helpers.cssToDOMName(a[3]),value:a[4].trim()}):a[5]&&(r.classes=r.classes.concat(a[5].slice(1).split(/\./))),t.nextMatch=i.lastIndex)}while(n);return r}},cssToDOMName:{value:function(e){if(!e.contains("-")){switch(e){case"bgcolor":e="backgroundColor";break;case"float":e="cssFloat"}return e}for(var t=e.split("-"),r=1;r<t.length;r++)t[r]=t[r].slice(0,1).toUpperCase()+t[r].slice(1);return t.join("")}},evalExpression:{value:function(t){var r;try{r=e.evalExpression(t),null==r||"function"==typeof r?r=t:(r=String(r),/\[(?:object(?:\s+[^\]]+)?|native\s+code)\]/.test(r)&&(r=t))}catch(e){r=t}return r}},evalPassageId:{value:function(t){return null==t||tale.has(t)||(t=e.helpers.evalExpression(t)),t}},parseSquareBracketedMarkup:{value:function(e){var t,r,i,a,n=function(){return g>=e.source.length?d:e.source[g++]},s=function(){return g>=e.source.length?d:e.source[g]},o=function(t){return 1>t||g+t>=e.source.length?d:e.source[g+t]},l=function(){return{error:String.format.apply(null,arguments),pos:g}},u=function(){f=g},c=function(t){var r=e.source.slice(f,g).trim();if(""===r)throw new Error("malformed wiki "+(i?"link":"image")+", empty "+t+" component");"link"===t&&"~"===r[0]?(p.forceInternal=!0,p.link=r.slice(1)):p[t]=r,f=g},h=function(e){g++;e:for(;;){switch(s()){case"\\":g++;var t=s();if(t!==d&&"\n"!==t)break;case d:case"\n":return d;case e:break e}g++}return g},d=-1,p={},f=e.matchStart,g=f+1;if(a=s(),"["===a)i=p.isLink=!0;else{switch(i=!1,a){case"<":p.align="left",g++;break;case">":p.align="right",g++}if(!/^[Ii][Mm][Gg]$/.test(e.source.slice(g,g+3)))return l("malformed square-bracketed wiki markup");g+=3,p.isImage=!0}if("["!==n())return l("malformed wiki {0}",i?"link":"image");t=1,r=0,u();try{e:for(;;){switch(a=s()){case d:case"\n":return l("unterminated wiki {0}",i?"link":"image");case'"':if(h(a)===d)return l("unterminated double quoted string in wiki {0}",i?"link":"image");break;case"'":if((4===r||3===r&&i)&&h(a)===d)return l("unterminated single quoted string in wiki {0}",i?"link":"image");break;case"|":0===r&&(c(i?"text":"title"),f++,r=1);break;case"-":0===r&&">"===o(1)&&(c(i?"text":"title"),g++,f+=2,r=1);break;case"<":0===r&&"-"===o(1)&&(c(i?"link":"source"),g++,f+=2,r=2);break;case"[":if(-1===r)return l("unexpected left square bracket '['");t++,1===t&&(u(),f++);break;case"]":if(t--,0===t){switch(r){case 0:case 1:c(i?"link":"source"),r=3;break;case 2:c(i?"text":"title"),r=3;break;case 3:i?(c("setter"),r=-1):(c("link"),r=4);break;case 4:c("setter"),r=-1}if(g++,"]"===s()){g++;break e}g--}}g++}}catch(e){return l(e.message)}return p.pos=g,p}}}),Object.defineProperty(e,"formatters",{value:[{name:"dollarSign",match:"\\${2}",handler:function(e){insertText(e.output,"$")}},{name:"$variable",match:"\\$\\w+(?:(?:\\.[A-Za-z_$]\\w*)|(?:\\[\\d+\\])|(?:\\[\"(?:\\\\.|[^\"\\\\])+\"\\])|(?:\\['(?:\\\\.|[^'\\\\])+'\\])|(?:\\[\\$\\w+\\]))*",handler:function(t){var r=printableStringOrDefault(e.getValue(t.matchText),null);null===r?insertText(t.output,t.matchText):new e(t.output,r)}},{name:"table",match:"^\\|(?:[^\\n]*)\\|(?:[fhck]?)$",lookahead:"^\\|([^\\n]*)\\|([fhck]?)$",rowTerminator:"\\|(?:[fhck]?)$\\n?",cellPattern:"(?:\\|([^\\n\\|]*)\\|)|(\\|[fhck]?$\\n?)",cellTerminator:"(?:\\x20*)\\|",rowTypes:{c:"caption",h:"thead","":"tbody",f:"tfoot"},handler:function(e){var t,r,i,a=insertElement(e.output,"table"),n=new RegExp(this.lookahead,"gm"),s=null,o=[],l=0;e.nextMatch=e.matchStart;do{n.lastIndex=e.nextMatch;var u=n.exec(e.source),c=u&&u.index===e.nextMatch;c&&(t=u[2],"k"===t?(a.className=u[1],e.nextMatch+=u[0].length+1):(t!==s&&(r=insertElement(a,this.rowTypes[t])),s=t,"c"===s?(0===l?r.setAttribute("align","top"):r.setAttribute("align","bottom"),e.nextMatch=e.nextMatch+1,e.subWikify(r,this.rowTerminator)):(i=insertElement(r,"tr"),this.rowHandler(e,i,o)),l++))}while(c)},rowHandler:function(t,r,i){var a=0,n=1,s=new RegExp(this.cellPattern,"gm");do{s.lastIndex=t.nextMatch;var o=s.exec(t.source),l=o&&o.index===t.nextMatch;if(l){if("~"===o[1]){var u=i[a];u&&(u.rowCount++,u.element.setAttribute("rowSpan",u.rowCount),u.element.setAttribute("rowspan",u.rowCount),u.element.valign="center"),t.nextMatch=o.index+o[0].length-1}else if(">"===o[1])n++,t.nextMatch=o.index+o[0].length-1;else{if(o[2]){t.nextMatch=o.index+o[0].length;break}var c,h=!1,d=!1;t.nextMatch++;for(var p=e.helpers.inlineCSS(t);" "===t.source.substr(t.nextMatch,1);)h=!0,t.nextMatch++;"!"===t.source.substr(t.nextMatch,1)?(c=insertElement(r,"th"),t.nextMatch++):c=insertElement(r,"td"),i[a]={rowCount:1,element:c};n>1&&(c.setAttribute("colSpan",n),c.setAttribute("colspan",n),n=1);for(var f=0;f<p.styles.length;f++)c.style[p.styles[f].style]=p.styles[f].value;for(var f=0;f<p.classes.length;f++)c.classList.add(p.classes[f]);t.subWikify(c,this.cellTerminator)," "===t.matchText.substr(t.matchText.length-2,1)&&(d=!0),h&&d?c.align="center":h?c.align="right":d&&(c.align="left"),t.nextMatch=t.nextMatch-1}a++}}while(l)}},{name:"heading",match:"^!{1,6}",terminator:"\\n",handler:function(e){var t=function(e){for(var t="function"==typeof window.getComputedStyle,r=e.length-1;r>=0;r--){var i=e[r];switch(i.nodeType){case Node.ELEMENT_NODE:var a=i.nodeName.toUpperCase();if("BR"===a)return!0;var n=t?window.getComputedStyle(i,null):i.currentStyle;if(n&&n.display)return"block"===n.display;switch(a){case"ADDRESS":case"ARTICLE":case"ASIDE":case"BLOCKQUOTE":case"CENTER":case"DIV":case"DL":case"FIGURE":case"FOOTER":case"FORM":case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"HEADER":case"HR":case"MAIN":case"NAV":case"OL":case"P":case"PRE":case"SECTION":case"TABLE":case"UL":return!0}return!1;case Node.COMMENT_NODE:break;default:return!1}}return!0}(e.output.childNodes);t?e.subWikify(insertElement(e.output,"h"+e.matchLength),this.terminator):insertText(e.output,e.matchText)}},{name:"list",match:"^(?:(?:\\*+)|(?:#+))",lookahead:"^(?:(\\*+)|(#+))",terminator:"\\n",outerElement:"ul",itemElement:"li",handler:function(e){e.nextMatch=e.matchStart;var t,r,i,a=new RegExp(this.lookahead,"gm"),n=[e.output],s=null,o=0;do{a.lastIndex=e.nextMatch;var l=a.exec(e.source),u=l&&l.index===e.nextMatch;if(u){if(t=l[2]?"ol":"ul",r=l[0].length,e.nextMatch+=l[0].length,r>o)for(i=o;r>i;i++)n.push(insertElement(n[n.length-1],t));else if(o>r)for(i=o;i>r;i--)n.pop();else r===o&&t!==s&&(n.pop(),n.push(insertElement(n[n.length-1],t)));o=r,s=t,e.subWikify(insertElement(n[n.length-1],"li"),this.terminator)}}while(u)}},{name:"quoteByBlock",match:"^<<<\\n",terminator:"^<<<\\n",handler:function(e){e.subWikify(insertElement(e.output,"blockquote"),this.terminator)}},{name:"quoteByLine",match:"^>+",terminator:"\\n",element:"blockquote",handler:function(e){var t,r=new RegExp(this.match,"gm"),i=[e.output],a=0,n=e.matchLength;do{if(n>a)for(t=a;n>t;t++)i.push(insertElement(i[i.length-1],this.element));else if(a>n)for(t=a;t>n;t--)i.pop();a=n,e.subWikify(i[i.length-1],this.terminator),insertElement(i[i.length-1],"br"),r.lastIndex=e.nextMatch;var s=r.exec(e.source),o=s&&s.index===e.nextMatch;o&&(n=s[0].length,e.nextMatch+=s[0].length)}while(o)}},{name:"rule",match:"^----+$\\n?|<hr ?/?>\\n?",handler:function(e){insertElement(e.output,"hr")}},{name:"monospacedByLine",match:"^\\{\\{\\{\\n",lookahead:"^\\{\\{\\{\\n((?:^[^\\n]*\\n)+?)(^\\}\\}\\}$\\n?)",handler:function(e){var t=new RegExp(this.lookahead,"gm");t.lastIndex=e.matchStart;var r=t.exec(e.source);r&&r.index===e.matchStart&&(insertElement(e.output,"pre",null,null,r[1]),e.nextMatch=t.lastIndex)}},{name:"prettyLink",match:"\\[\\[[^[]",handler:function(t){var r=e.helpers.parseSquareBracketedMarkup(t);if(r.hasOwnProperty("error"))return void t.outputText(t.output,t.matchStart,t.nextMatch);t.nextMatch=r.pos;var i=e.helpers.evalPassageId(r.link),a=r.hasOwnProperty("text")?e.helpers.evalExpression(r.text):i,n=r.hasOwnProperty("setter")?function(t){return function(){e.evalStatements(t)}}(e.parse(r.setter)):null;r.forceInternal||!e.isExternalLink(i)?e.createInternalLink(t.output,i,a,n):e.createExternalLink(t.output,i,a)}},{name:"urlLink",match:e.textPrimitives.url,handler:function(t){t.outputText(e.createExternalLink(t.output,t.matchText),t.matchStart,t.nextMatch)}},{name:"image",match:"\\[[<>]?[Ii][Mm][Gg]\\[",handler:function(t){var r=e.helpers.parseSquareBracketedMarkup(t);if(r.hasOwnProperty("error"))return void t.outputText(t.output,t.matchStart,t.nextMatch);t.nextMatch=r.pos;var i,a=t.output,n=r.hasOwnProperty("setter")?function(t){return function(){e.evalStatements(t)}}(e.parse(r.setter)):null;if(r.hasOwnProperty("link")){var s=e.helpers.evalPassageId(r.link);a=r.forceInternal||!e.isExternalLink(s)?e.createInternalLink(a,s,null,n):e.createExternalLink(a,s),a.classList.add("link-image")}if(a=insertElement(a,"img"),i=e.helpers.evalPassageId(r.source),"data:"!==i.slice(0,5)&&tale.has(i)){var o=tale.get(i);o.tags.contains("Twine.image")&&(a.setAttribute("data-passage",o.title),i=o.text)}a.src=i,r.hasOwnProperty("title")&&(a.title=e.helpers.evalExpression(r.title)),r.hasOwnProperty("align")&&(a.align=r.align)}},{name:"macro",match:"<<",lookaheadRegExp:/<<(\/?[A-Za-z][^>\s]*)(?:\s*)((?:(?:\"(?:\\.|[^\"\\])*\")|(?:\'(?:\\.|[^\'\\])*\')|(?:\[(?:[<>]?[Ii][Mm][Gg])?\[[^\r\n]*?\]\]+)|[^>]|(?:>(?!>)))*)>>/gm,argsPattern:"(?:"+['("(?:\\\\.|[^"\\\\])+")',"('(?:\\\\.|[^'\\\\])+')","(\"\"|'')","(\\[(?:[<>]?[Ii][Mm][Gg])?\\[[^\\r\\n]*?\\]\\]+)","([^\"'`\\s]\\S*)"].join("|")+")",working:{name:"",handler:"",arguments:"",index:0},context:null,handler:function(e){var t=this.lookaheadRegExp.lastIndex=e.matchStart;if(this.parseTag(e)){var r=e.nextMatch,i=this.working.name,a=this.working.handler,n=this.working.arguments;try{var s=macros.get(i);if(!s)return macros.tags.hasOwnProperty(i)?throwError(e.output,"child tag <<"+i+">> was found outside of a call to its parent macro"+(1===macros.tags[i].length?"":"s")+" <<"+macros.tags[i].join(">>, <<")+">>",e.source.slice(t,e.nextMatch)):throwError(e.output,"macro <<"+i+">> does not exist",e.source.slice(t,e.nextMatch));var o=null;if(s.hasOwnProperty("tags")&&(o=this.parseBody(e,s.tags),!o))return e.nextMatch=r,throwError(e.output,"cannot find a closing tag for macro <<"+i+">>",e.source.slice(t,e.nextMatch)+"…");if("function"!=typeof s[a])return throwError(e.output,"macro <<"+i+'>> handler function "'+a+'" '+(s.hasOwnProperty(a)?"is not a function":"does not exist"),e.source.slice(t,e.nextMatch));var l=s.hasOwnProperty("skipArgs")&&s.skipArgs?[]:this.parseArgs(n);if(s.hasOwnProperty("_USE_MACROS_API"))try{this.context=new MacrosContext(this.context,s,i,n,l,o,e,e.source.slice(t,e.nextMatch)),s[a].call(this.context)}finally{this.context=this.context.parent}else{var u=e._rawArgs;e._rawArgs=n,s[a](e.output,i,l,e,o),e._rawArgs=u}}catch(r){return throwError(e.output,"cannot execute "+(s&&s.isWidget?"widget":"macro")+" <<"+i+">>: "+r.message,e.source.slice(t,e.nextMatch))}finally{this.working.name="",this.working.handler="",this.working.arguments="",this.working.index=0}}else e.outputText(e.output,e.matchStart,e.nextMatch)},parseTag:function(e){var t=this.lookaheadRegExp.exec(e.source);if(t&&t.index===e.matchStart&&t[1]){e.nextMatch=this.lookaheadRegExp.lastIndex;var r=t[1].indexOf("::");return-1!==r?(this.working.name=t[1].slice(0,r),this.working.handler=t[1].slice(r+2)):(this.working.name=t[1],this.working.handler="handler"),this.working.arguments=t[2],this.working.index=t.index,!0}return!1},parseBody:function(e,t){for(var r=this.working.name,i="/"+r,a="end"+r,n=Array.isArray(t)?t:!1,s=-1,o=1,l=this.working.name,u=this.working.arguments,c=e.nextMatch,h=[];-1!==(e.matchStart=e.source.indexOf(this.match,e.nextMatch));)if(this.parseTag(e)){var d=this.working.name,p=this.working.arguments,f=this.working.index,g=e.nextMatch;switch(d){case r:o++;break;case a:case i:o--;break;default:if(1===o&&n)for(var m=0,y=n.length;y>m;m++)d===n[m]&&(h.push({name:l,arguments:u,contents:e.source.slice(c,f)}),l=d,u=p,c=g)}if(0===o){h.push({name:l,arguments:u,contents:e.source.slice(c,f)}),s=g;break}}else this.lookaheadRegExp.lastIndex=e.nextMatch=e.matchStart+this.match.length;return-1!==s?(e.nextMatch=s,h):null},parseArgs:function(t){for(var r,i=new RegExp(this.argsPattern,"gm"),a=[];null!==(r=i.exec(t));){var n;if(r[1]){n=r[1];try{n=Util.evalExpression(n)}catch(e){throw new Error("unable to parse macro argument '"+n+"': "+e.message)}}else if(r[2]){n=r[2];try{n=Util.evalExpression(n)}catch(e){throw new Error('unable to parse macro argument "'+n+'": '+e.message)}}else if(r[3])n="";else if(r[4]){n=r[4];var s=e.helpers.parseSquareBracketedMarkup({source:n,matchStart:0});if(s.hasOwnProperty("error"))throw new Error('unable to parse macro argument "'+n+'": '+s.error);if(s.pos<n.length)throw new Error('unable to parse macro argument "'+n+'": unexpected character(s) "'+n.slice(s.pos)+'" (pos: '+s.pos+")");s.isLink?(n={isLink:!0},n.count=s.hasOwnProperty("text")?2:1,n.link=e.helpers.evalPassageId(s.link),n.text=s.hasOwnProperty("text")?e.helpers.evalExpression(s.text):n.link,n.external=!s.forceInternal&&e.isExternalLink(n.link),n.setFn=s.hasOwnProperty("setter")?function(t){return function(){e.evalStatements(t)}}(e.parse(s.setter)):null):s.isImage&&(n=function(e){var t={isImage:!0,source:e};if("data:"!==e.slice(0,5)&&tale.has(e)){var r=tale.get(e);r.tags.contains("Twine.image")&&(t.source=r.text,t.passage=r.title)}return t}(s.source),s.hasOwnProperty("align")&&(n.align=s.align),s.hasOwnProperty("title")&&(n.title=e.helpers.evalExpression(s.title)),s.hasOwnProperty("link")&&(n.link=e.helpers.evalPassageId(s.link),n.external=!s.forceInternal&&e.isExternalLink(n.link)),n.setFn=s.hasOwnProperty("setter")?function(t){return function(){e.evalStatements(t)}}(e.parse(s.setter)):null)}else if(r[5])if(n=r[5],/^\$\w+/.test(n))n=e.getValue(n);else if(/^(?:options|setup)[\.\[]/.test(n))try{n=e.evalExpression(n)}catch(e){throw new Error('unable to parse macro argument "'+n+'": '+e.message)}else if(/^(?:\{.*\}|\[.*\])$/.test(n))try{n=e.evalExpression(n)}catch(e){throw new Error('unable to parse macro argument "'+n+'": '+e.message)}else"null"===n?n=null:"undefined"===n?n=undefined:"true"===n?n=!0:"false"===n?n=!1:!isNaN(parseFloat(n))&&isFinite(n)&&(n=Number(n));a.push(n)}return a}},{name:"html",match:"<[Hh][Tt][Mm][Ll]>",lookaheadRegExp:/<[Hh][Tt][Mm][Ll]>((?:.|\n)*?)<\/[Hh][Tt][Mm][Ll]>/gm,handler:function(e){this.lookaheadRegExp.lastIndex=e.matchStart;var t=this.lookaheadRegExp.exec(e.source);if(t&&t.index===e.matchStart){e.nextMatch=this.lookaheadRegExp.lastIndex;var r=document.createDocumentFragment(),i=document.createElement("div");for(i.innerHTML=t[1];i.firstChild;)r.appendChild(i.firstChild);e.output.appendChild(r)}}},{name:"commentByBlock",match:"/(?:%|\\*)",lookaheadRegExp:/\/(%|\*)((?:.|\n)*?)\1\//gm,handler:function(e){this.lookaheadRegExp.lastIndex=e.matchStart;var t=this.lookaheadRegExp.exec(e.source);t&&t.index===e.matchStart&&(e.nextMatch=this.lookaheadRegExp.lastIndex)}},{name:"htmlCommentByBlock",match:"<!--",lookaheadRegExp:/<!--((?:.|\\n)*?)-->/gm,handler:function(e){this.lookaheadRegExp.lastIndex=e.matchStart;var t=this.lookaheadRegExp.exec(e.source);t&&t.index===e.matchStart&&(e.output.appendChild(document.createComment(t[1])),e.nextMatch=this.lookaheadRegExp.lastIndex)}},{name:"formatByChar",match:"''|//|__|\\^\\^|~~|==|\\{\\{\\{",handler:function(e){switch(e.matchText){case"''":e.subWikify(insertElement(e.output,"strong"),"''");break;case"//":e.subWikify(insertElement(e.output,"em"),"//");break;case"__":e.subWikify(insertElement(e.output,"u"),"__");break;case"^^":e.subWikify(insertElement(e.output,"sup"),"\\^\\^");break;case"~~":e.subWikify(insertElement(e.output,"sub"),"~~");break;case"==":e.subWikify(insertElement(e.output,"s"),"==");break;case"{{{":var t=/\{\{\{((?:.|\n)*?)\}\}\}/gm;t.lastIndex=e.matchStart;var r=t.exec(e.source);r&&r.index===e.matchStart&&(insertElement(e.output,"code",null,null,r[1]),e.nextMatch=t.lastIndex)}}},{name:"customStyle",match:"@@",terminator:"@@",blockRegExp:/\s*\n/gm,handler:function(t){var r=e.helpers.inlineCSS(t);this.blockRegExp.lastIndex=t.nextMatch;var i=this.blockRegExp.exec(t.source),a=i&&i.index===t.nextMatch,n=insertElement(t.output,a?"div":"span");if(0===r.styles.length&&0===r.classes.length)n.className="marked";else{for(var s=0;s<r.styles.length;s++)n.style[r.styles[s].style]=r.styles[s].value;for(var s=0;s<r.classes.length;s++)n.classList.add(r.classes[s])}a?(t.nextMatch+=i[0].length,t.subWikify(n,"\\n?"+this.terminator)):t.subWikify(n,this.terminator)}},{name:"emdash",match:"--",handler:function(e){insertText(e.output,"—")}},{name:"lineContinuation",match:"\\\\[\\s\\u00a0\\u2028\\u2029]*?(?:\\n|$)",handler:function(e){e.nextMatch=e.matchStart+e.matchLength}},{name:"lineBreak",match:"\\n|<br ?/?>",handler:function(e){0!==e._nobr.length&&e._nobr[0]||insertElement(e.output,"br")}},{name:"rawText",match:'"{3}|<nowiki>',lookaheadRegExp:/(?:\"{3}|<nowiki>)((?:.|\n)*?)(?:\"{3}|<\/nowiki>)/gm,handler:function(e){this.lookaheadRegExp.lastIndex=e.matchStart;var t=this.lookaheadRegExp.exec(e.source);t&&t.index===e.matchStart&&(insertElement(e.output,"span",null,null,t[1]),e.nextMatch=this.lookaheadRegExp.lastIndex)}},{name:"htmlCharacterReference",match:"(?:(?:&#?[a-zA-Z0-9]{2,8};|.)(?:&#?(?:x0*(?:3[0-6][0-9a-fA-F]|1D[c-fC-F][0-9a-fA-F]|20[d-fD-F][0-9a-fA-F]|FE2[0-9a-fA-F])|0*(?:76[89]|7[7-9][0-9]|8[0-7][0-9]|761[6-9]|76[2-7][0-9]|84[0-3][0-9]|844[0-7]|6505[6-9]|6506[0-9]|6507[0-1]));)+|&#?[a-zA-Z0-9]{2,8};)",handler:function(e){var t=document.createElement("span");t.innerHTML=e.matchText,insertText(e.output,t.textContent),"function"==typeof t.remove&&t.remove()}},{name:"htmlTag",match:"<\\w+(?:\\s+[^\\u0000-\\u001F\\u007F-\\u009F\\s\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*?\"|'[^']*?'|[^\\s\"'=<>`]+))?)*\\s*\\/?>",tagPattern:"<(\\w+)",voidElements:["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],nobrElements:["colgroup","datalist","dl","figure","ol","optgroup","select","table","tbody","tfoot","thead","tr","ul"],handler:function(e){var t=new RegExp(this.tagPattern).exec(e.matchText),r=t&&t[1],i=r&&r.toLowerCase();if(i){var a,n,s,o=this.voidElements.contains(i),l=this.nobrElements.contains(i);if(o||(a="<\\/"+i+"\\s*>",n=new RegExp(a,"gim"),n.lastIndex=e.matchStart,s=n.exec(e.source)),o||s){var u=document.createElement(e.output.tagName);for(u.innerHTML=e.matchText;u.firstChild;)u=u.firstChild;if(u.hasAttribute("data-passage")&&this.processDataAttributes(u),s){l?e._nobr.unshift(!0):0!==e._nobr.length&&e._nobr.unshift(!1);try{e.subWikify(u,a,!0)}finally{0!==e._nobr.length&&e._nobr.shift()}}e.output.appendChild(u)}else throwError(e.output,'HTML tag "'+r+'" is not closed',e.matchText+"…")}},processDataAttributes:function(t){var r=t.getAttribute("data-passage");if(null!=r&&(r=("string"!=typeof r?String(r):r).trim(),/^\$\w+/.test(r)&&(r=e.getValue(r),t.setAttribute("data-passage",r)),""!==r))if("IMG"===t.tagName.toUpperCase()){var i;tale.has(r)&&(r=tale.get(r),r.tags.contains("Twine.image")&&(i=r.text)),t.src=i}else{var a,n=t.getAttribute("data-setter");
null!=n&&(n=("string"!=typeof n?String(n):n).trim(),""!==n&&(a=function(t){return function(){e.evalStatements(t)}}(e.parse(n)))),tale.has(r)?(t.classList.add("link-internal"),config.addVisitedLinkClass&&state.has(r)&&t.classList.add("link-visited")):t.classList.add("link-broken"),jQuery(t).click(function(){"function"==typeof a&&a(),state.display(r,t)})}}}]}),e}();Object.defineProperties(Macros.prototype,{add:{value:function(e,t,r){if(Array.isArray(e))return void e.forEach(function(e){this.add(e,t,r)},this);if(this.has(e))throw new Error("cannot clobber existing macro <<"+e+">>");if(this.tags.hasOwnProperty(e))throw new Error("cannot clobber child tag <<"+e+">> of parent macro"+(1===this.tags[e].length?"":"s")+" <<"+this.tags[e].join(">>, <<")+">>");try{if("object"==typeof t)this.definitions[e]=r?clone(t):t;else{if(!this.has(t))throw new Error("cannot create alias of nonexistent macro <<"+t+">>");this.definitions[e]=r?clone(this.definitions[t]):this.definitions[t]}Object.defineProperty(this.definitions,e,{writable:!1}),this.definitions[e]._USE_MACROS_API=!0}catch(t){throw"TypeError"===t.name?new Error("cannot clobber protected macro <<"+e+">>"):new Error("unknown error when attempting to add macro <<"+e+">>: ["+t.name+"] "+t.message)}if(this.definitions[e].hasOwnProperty("tags"))if(null==this.definitions[e].tags)this.registerTags(e);else{if(!Array.isArray(this.definitions[e].tags))throw new Error('bad value for "tags" property of macro <<'+e+">>");this.registerTags(e,this.definitions[e].tags)}}},remove:{value:function(e){if(Array.isArray(e))return void e.forEach(function(e){this.remove(e)},this);if(this.definitions.hasOwnProperty(e)){this.definitions[e].hasOwnProperty("tags")&&this.unregisterTags(e);try{Object.defineProperty(this.definitions,e,{writable:!0}),delete this.definitions[e]}catch(t){throw new Error("unknown error removing macro <<"+e+">>: "+t.message)}}else if(this.tags.hasOwnProperty(e))throw new Error("cannot remove child tag <<"+e+">> of parent macro <<"+this.tags[e]+">>")}},has:{value:function(e,t){return this.definitions.hasOwnProperty(e)||(t?this.tags.hasOwnProperty(e):!1)}},get:{value:function(e){var t=null;return this.definitions.hasOwnProperty(e)&&"function"==typeof this.definitions[e].handler?t=this.definitions[e]:this.hasOwnProperty(e)&&"function"==typeof this[e].handler&&(t=this[e]),t}},getHandler:{value:function(e,t){var r=this.get(e);return t||(t="handler"),r&&r.hasOwnProperty(t)&&"function"==typeof r[t]?r[t]:null}},evalStatements:{value:function(statements,thisp){try{return eval(null==thisp?'var output = document.createElement("div");(function(){'+statements+"\n}());":"var output = thisp.output;(function(){"+statements+"\n}.call(thisp));"),!0}catch(e){if(null==thisp)throw e;return thisp.error("bad evaluation: "+e.message)}}},registerTags:{value:function(e,t){if(!e)throw new Error("no parent specified");Array.isArray(t)||(t=[]);for(var r=["/"+e,"end"+e],i=[].concat(r,t),a=0;a<i.length;a++){var n=i[a];if(this.definitions.hasOwnProperty(n))throw new Error("cannot register tag for an existing macro");this.tags.hasOwnProperty(n)?this.tags[n].contains(e)||(this.tags[n].push(e),this.tags[n].sort()):this.tags[n]=[e]}}},unregisterTags:{value:function(e){if(!e)throw new Error("no parent specified");Object.keys(this.tags).forEach(function(t){var r=this.tags[t].indexOf(e);-1!==r&&(1===this.tags[t].length?delete this.tags[t]:this.tags[t].splice(r,1))},this)}},init:{value:function(){Object.keys(this.definitions).forEach(function(e){var t=this.getHandler(e,"init");t&&t.call(this.definitions[e],e)},this),Object.keys(this).forEach(function(e){var t=this.getHandler(e,"init");t&&t.call(this[e],e)},this)}},lateInit:{value:function(){Object.keys(this.definitions).forEach(function(e){var t=this.getHandler(e,"lateInit");t&&t.call(this.definitions[e],e)},this),Object.keys(this).forEach(function(e){var t=this.getHandler(e,"lateInit");t&&t.call(this[e],e)},this)}}}),Object.defineProperties(MacrosContext.prototype,{contextHas:{value:function(e){for(var t=this;null!==(t=t.parent);)if(e(t))return!0;return!1}},contextSelect:{value:function(e){for(var t=this,r=[];null!==(t=t.parent);)e(t)&&r.push(t);return r}},error:{value:function(e){return throwError(this.output,"<<"+this.name+">>: "+e,this.source)}}}),window.onerror=function(e,t,r,i,a){technicalAlert(null,e,a)},window.SugarCube={};var version=Object.freeze({title:"SugarCube",major:1,minor:0,patch:35,prerelease:null,build:7110,date:new Date("2016-04-22T19:47:06.454Z"),extensions:{},toString:function(){return this.major+"."+this.minor+"."+this.patch+(this.prerelease?"-"+this.prerelease:"")+"+"+this.build},short:function(){return this.title+" (v"+this.major+"."+this.minor+"."+this.patch+(this.prerelease?"-"+this.prerelease:"")+")"},long:function(){return this.title+" v"+this.toString()+" ("+this.date.toUTCString()+")"}}),HistoryMode=Object.freeze({Hash:History.Modes.Hash,Window:History.Modes.Window,Session:History.Modes.Session}),modes=Object.freeze({hashTag:History.Modes.Hash,windowHistory:History.Modes.Window,sessionHistory:History.Modes.Session}),runtime=Object.defineProperties({},{flags:{value:{HistoryPRNG:{isEnabled:!1,isMathPRNG:!1}}},temp:{writable:!0,value:{}}}),config={hasPushState:has.pushState,hasLocalStorage:has.localStorage,hasSessionStorage:has.sessionStorage,hasFileAPI:has.fileAPI,userAgent:browser.userAgent,browser:browser,addVisitedLinkClass:!1,altPassageDescription:undefined,displayPassageTitles:!1,loadDelay:0,startPassage:undefined,updatePageElements:!0,disableHistoryControls:!1,disableHistoryTracking:!1,historyMode:has.pushState?has.sessionStorage?History.Modes.Session:History.Modes.Window:History.Modes.Hash,passageTransitionOut:undefined,transitionEndEventName:function(){for(var e={transition:"transitionend",MSTransition:"msTransitionEnd",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend"},t=Object.keys(e),r=document.createElement("div"),i=0;i<t.length;i++)if(r.style[t[i]]!==undefined)return e[t[i]];return""}(),macros:{disableIfAssignmentError:!1,maxLoopIterations:1e3},saves:{autoload:undefined,autosave:undefined,id:"untitled-story",isAllowed:undefined,onLoad:undefined,onSave:undefined,slots:8},errorName:undefined,errors:{}},macros={},tale={},state={},storage={},session={},options={},setup={},prehistory={},predisplay={},postdisplay={},prerender={},postrender={};jQuery(document).ready(function(){try{document.normalize&&document.normalize(),macros=new Macros,defineStandardMacros(),tale=new Tale,tale.init(),state=new History,storage=new KeyValueStore("webStorage",!0,tale.domId),session=new KeyValueStore("webStorage",!1,tale.domId),config.saves.id=tale.domId,UISystem.init(),session.hasItem("rcWarn")||has.pushState&&"cookie"!==storage.name||(session.setItem("rcWarn",1),window.alert(("Apologies! Your browser either lacks some of the capabilities required by this %identity% or has disabled them, so this %identity% is running in a degraded mode. You may be able to continue, but some parts may not work properly.\n\nThe former may, probably, be solved by upgrading your browser. The latter may be solved by loosening its security restrictions"+("file:"===window.location.protocol?" or, perhaps, by playing this %identity% via the HTTP protocol.":".")).replace(/%identity%/g,strings.identity)));for(var i=0;i<tale.styles.length;i++)addStyle(tale.styles[i].text);for(var i=0;i<tale.scripts.length;i++)try{eval(tale.scripts[i].text)}catch(e){technicalAlert(tale.scripts[i].title,e.message)}for(var i=0;i<tale.widgets.length;i++)try{Wikifier.wikifyEval(tale.widgets[i].processText())}catch(e){technicalAlert(tale.widgets[i].title,e.message)}SaveSystem.init(),macros.init(),state.init(),macros.lateInit(),UISystem.start()}catch(e){return fatalAlert(null,e.message)}window.SugarCube={version:version,runtime:runtime,has:has,browser:browser,config:config,setup:setup,storage:storage,session:session,macros:macros,tale:tale,state:state,Wikifier:Wikifier,Util:Util,History:History,Passage:Passage,Tale:Tale,SaveSystem:SaveSystem,UISystem:UISystem}})}(window,window.document);}
	</script>
</body>
</html>

index.cs

@tailwind base;
@tailwind components;
@tailwind utilities;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    
index.js

    import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
      <App />
    </UserProvider>
);

    package.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
     {
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.2",
    "chart.js": "^4.4.3",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.3.1",
    "react-modal": "^3.16.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "tailwindcss": "^3.4.4"
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
 tailwind.config.js                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
    
data.txt
    
%pip install -q llama-index 'google-generativeai>=0.3.0' qdrant_client llama-index-embeddings-fastembed fastembed llama-index-llms-gemini

%pip install llama_index

from llama_index.core import SimpleDirectoryReader
docs = SimpleDirectoryReader("Dataset").load_data()

from llama_index.core.node_parser.text import SentenceSplitter
# Initialize the SentenceSplitter with a specific chunk size
text_parser = SentenceSplitter(chunk_size=1024)
text_chunks = [] # This will hold all the chunks of text from all documents
doc_idxs = [] # This will keep track of the document each chunk came from
for doc_idx, doc in enumerate(docs):
 # Split the current document's text into chunks
 cur_text_chunks = text_parser.split_text(doc.text)
 
 # Extend the list of all text chunks with the chunks from the current document
 text_chunks.extend(cur_text_chunks)
 
 # Extend the document index list with the index of the current document, repeated for each chunk
 doc_idxs.extend([doc_idx] * len(cur_text_chunks))

from llama_index.core.schema import TextNode
nodes = [] # This will hold all TextNode objects created from the text chunks
# Iterate over each text chunk and its index
for idx, text_chunk in enumerate(text_chunks):
 # Create a TextNode object with the current text chunk
 node = TextNode(text=text_chunk)
 
 # Retrieve the source document using the current index mapped through doc_idxs
 src_doc = docs[doc_idxs[idx]]
 
 # Assign the source document's metadata to the node's metadata attribute
 node.metadata = src_doc.metadata
 
 # Append the newly created node to the list of nodes
 nodes.append(node)


%pip install llama_index.vector_stores


%pip install llama-index-vector-stores-postgres

%pip install llama-index-vector-stores-qdrant llama-index-readers-file llama-index-embeddings-fastembed llama-index-llms-openai

%pip install -U qdrant_client fastembed

%pip install llama_index.vector_stores.qdrant

%pip install llama_index.embeddings.fastembed

import logging
import sys
import os

import qdrant_client
from IPython.display import Markdown, display
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core import StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core import Settings



from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.core import Settings
from llama_index.core import StorageContext


import qdrant_client

# Create a local Qdrant vector store
client = qdrant_client.QdrantClient(path="financialnews")
vector_store = QdrantVectorStore(client=client, collection_name="collection")


%env GOOGLE_API_KEY = "AIzaSyAXkx3934Zo-JYslaMeIBwqGIjw3q1Whcs"
import os
GOOGLE_API_KEY = "AIzaSyAXkx3934Zo-JYslaMeIBwqGIjw3q1Whcs" # add your GOOGLE API key here
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY



%pip install qdrant-client[fastembed]


%pip install --upgrade --quiet  fastembed


%pip install langchain_community

from langchain_community.embeddings.fastembed import FastEmbedEmbeddings


%pip install llama_index.llms.gemini


from llama_index.embeddings.fastembed import FastEmbedEmbedding

embed_model = FastEmbedEmbedding(model_name="BAAI/bge-small-en-v1.5")
for node in nodes:
 node_embedding = embed_model.get_text_embedding(
 node.get_content(metadata_mode="all")
 )
 node.embedding = node_embedding
from llama_index.llms.gemini import Gemini
Settings.embed_model = embed_model
Settings.llm = Gemini(model="models/gemini-pro")
Settings.transformations = [SentenceSplitter(chunk_size=1024)]
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex(
 nodes=nodes,
 storage_context=storage_context,
transformations=Settings.transformations,
)



%pip install llama_index.embeddings.fastembed


from llama_index.core import get_response_synthesizer
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
vector_retriever = VectorIndexRetriever(index=index, similarity_top_k=2)
response_synthesizer = get_response_synthesizer()
vector_query_engine = RetrieverQueryEngine(
 retriever=vector_retriever,
 response_synthesizer=response_synthesizer,
)


from llama_index.core.indices.query.query_transform import HyDEQueryTransform
from llama_index.core.query_engine import TransformQueryEngine
hyde = HyDEQueryTransform(include_original=True)
hyde_query_engine = TransformQueryEngine(vector_query_engine, hyde)


query_str="Tell me all news about scam"
response = hyde_query_engine.query(query_str)
print(response)


    


    

        
    

    
    

    

        

        




    



    
    



    



        









                          

                


          

    













        



        

        














    





    


    





                    </div>
                                      

