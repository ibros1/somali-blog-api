import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ICreateArtcile } from "../../types/article";
import { AuthRequest } from "../../types/request";
const prisma = new PrismaClient();

export const createArticle = async (req: AuthRequest, res: Response) => {
  try {
    const data: ICreateArtcile = req.body;

    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        is_published: data.isPublished,
        user_id: req.userId!,
      },
    });

    res.status(200).json({
      isSuccess: true,
      message: "New article is successfully created!",
      newArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: "Something went wrong!",
    });
  }
};

// TODO: Get all articles (only published ones)
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        is_published: true,
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            profilePhoto: true,
          },
        },
      },
    });

    res.status(200).json({
      isSuccess: true,
      message: "Successfully fetched all posts",
      articles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: "Something went wrong!",
    });
  }
};

export const getOneMembersArticles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const myArticles = await prisma.article.findMany({
      where: {
        user_id: +userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            profilePhoto: true,
            coverPhoto: true,
          },
        },
      },
    });
    const user = await prisma.users.findFirst({
      where: {
        id: +userId,
      },
    });

    res.status(200).json({
      isSuccess: true,
      articles: myArticles,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: "Something went wrong!",
    });
  }
};

// TODO: Get my articles (published/unpublished)
export const getMyArticles = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const myArticles = await prisma.article.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
            profilePhoto: true,
          },
        },
      },
    });

    res.status(200).json({
      isSuccess: true,
      articles: myArticles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: "Something went wrong!",
    });
  }
};

export const getOneArticle = async (req: Request, res: Response) => {
  try {
    const articleId = parseInt(req.params.articleId);
    if (!articleId) {
      res.status(404).json({
        isSuccess: false,
        message: "Article not found",
      });
      return;
    }
    const article = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
      include: {
        user: {
          select: {
            fullname: true,
            email: true,
            profilePhoto: true,
            coverPhoto: true,
          },
        },
      },
    });
    if (!article) {
      res.status(404).json({
        isSuccess: false,
        message: "this article is not exist",
      });
      return;
    }

    res.status(200).json({
      isSuccess: true,
      message: "sucessfully fetched",
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "server error",
    });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    if (!articleId) {
      res.status(400).json({
        isSuccess: false,
        message: "article id is needed",
      });
      return;
    }
    const post = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
    });
    if (!post) {
      res.status(404).json({
        isSuccess: false,

        message: "Article not found",
      });
      return;
    }

    const deletedPost = await prisma.article.delete({
      where: {
        id: +articleId,
      },
    });

    res.status(200).json({
      isSuccess: true,
      message: "Successfully deleted article",
      deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Server error",
    });
  }
};
