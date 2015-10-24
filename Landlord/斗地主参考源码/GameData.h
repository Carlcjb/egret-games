#ifndef  _GAMEDATA_FILE_H
#define  _GAMEDATA_FILE_H

#define  ONE_SCORE       0
#define  TWO_SCORE       1
#define  STREE_SCORE     2
#define  NOCALL          3
#define  SENDCARD        4
#define  HELP            5
#define  NOSENDCARD      6

#define  PLAYER_A    7  //���A
#define  PLAYER_B    8 //���B
#define  PLAYER_C    9 //���C

#define  FAIPAI      10
#define  PREPARE     11 //׼����Ϸ�����ƣ�
#define  START       12 //��ʼ��Ϸ
#define  END         13 //��Ϸ����



//�ƵĽṹ��
struct  SCARD
	{
	 int ID;//�Ƶ�ʵ�ʴ�С
	 int cx;//ͼƬ��X��ʼ����
	 int cy; //ͼƬ��Y��ʼ����
	 float coord_x;//ͼƬ����Ļ�е�X����
	 float coord_y;//ͼƬ����Ļ�е�Y����
	 bool show;//�ж���ʾ�Ƶ����滹�Ǳ��� false ��ʾ���� true��ʾ����
	 bool isUp;//�жϸ����Ƿ���ҵ����false û��� true���
	 int index;
	 bool isHave;
	 bool isBack;
	 SCARD()
		 {
		   ID=-1;
		   cx=-1;
		   cy=-1;
		   index =0;
		   coord_x=0.0f;
		   coord_y=0.0f;
		   show=false;
		   isUp=false;
		   isBack =true;
		   isHave =false;
		 }

	};
struct  SENDCARDS
	{
	int ID;//�ļҳ�����
	int cx;//ͼƬ��X��ʼ����
	int cy; //ͼƬ��Y��ʼ����
	float coord_x;//ͼƬ����Ļ�е�X����
	float coord_y;//ͼƬ����Ļ�е�Y����
	int index;//ͼƬ������
	};

struct PASS
	{
	int x;//X����
	int y;//y����
	bool isShow;//�Ƿ���ʾ
	};
//ͼƬ��ť�ṹ��
struct IMAGEBUTTON
	{
	CRect  s_rcet; //rect ���������ж���ҵ���
	int ID;      //ͼƬ����ʲôʱ��
	int index;//ͼƬ����������������һ��

	bool s_isShow; //�ж��Ƿ���ʾ
	bool s_isChicl;//�жϸ�ͼƬ�Ƿ���Ե��
	IMAGEBUTTON()
		{
		s_rcet.SetRect(0,0,0,0);
		s_isShow =true;
		ID=0;
		s_isChicl =false;
		index =0;
		}
	};

struct NUMBER//���㵥�ţ����ӣ�3�ţ�ը�����ֵĴ���
	{
	int first;
	int second;
	int three;
	int four;
	int max;
	};
enum  CARDTYPE
	{
	SINGLECARD=1,                      //����
	BOTHCARDS,                         //����
	LINKCARDS,                         //����
	LINKBOTHCARDS,                     //����
	THREECARDS,                        //3����
	THREECARDSOFONE,                   //����һ
	THREECARDSOFTWO,                   //3��2
	PLANECARDS,                        //�ɻ�����
	PLANECARDSOFONE,                   //�ɻ�������
	PLANECARDSOFTWO,                   //�ɻ���2��
	BOMBCARDS,                         //ը��
	BOMBCARDSOFONE,                    //�ĸ���2��;
	BOMBCARDSOFTWO,                    //4����1��
	ERRORCARDS                         //�������(���Ͳ���ȷ)
	};
#endif