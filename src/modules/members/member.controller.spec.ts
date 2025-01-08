import { Test, TestingModule } from "@nestjs/testing";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("MemberController", () => {
  let app: INestApplication;
  let memberServiceMock: Partial<MemberService>;

  beforeAll(async () => {
    // Mockando o serviço
    memberServiceMock = {
      create: jest.fn().mockResolvedValue({
        id: "16777edb68932fc9baeb5d99e",
        name: "name",
        communityLevel: "basic",
        currentSquad: "avengers",
        skills: [],
        softSkills: [],
        stack: "stack",
      }),
      findAll: jest.fn().mockResolvedValue([
        {
          id: "6777edb68932fc9baeb5d99e",
          name: "john",
          stack: "fullstack",
          communityLevel: "senior",
          currentSquad: "alpha squad",
          skills: ["JavaScript", "TypeScript"],
          softSkills: ["Communication", "Teamwork"],
        },
      ]),
    };

    // Criando o módulo de teste
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [{ provide: MemberService, useValue: memberServiceMock }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("createMember", () => {
    it("deveria criar um membro", async () => {
      const dto = {
        name: "name",
        communityLevel: "basic",
        currentSquad: "avengers",
        skills: [],
        softSkills: [],
        stack: "stack",
      };
      const response = await request(app.getHttpServer())
        .post("/members")
        .send(dto)
        .expect(201);
    });
  });

  describe("findAll", () => {
    it("deveria retornar todos os membros", async () => {
      const response = await request(app.getHttpServer())
        .get("/members/find-all")
        .expect(200);
      expect(memberServiceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
